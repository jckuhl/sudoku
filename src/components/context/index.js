import React, { Component } from 'react';
import random from './../scripts/random';

export const Context = React.createContext();

export class Provider extends Component {

    state = {
        values: []
    }

    validateBy = (type, v, currentCell) => {
        const valuesByType = v.filter(cell => cell[type] === currentCell[type]);
        let noneMatch = true;
        for(let i = 0; i < valuesByType.length; i++) {
            for(let j = 0; j< valuesByType.length; j++) {
                if(i !== j && valuesByType[i].value === valuesByType[j].value) {
                    noneMatch = false;
                    break;
                }
            }
            if(!noneMatch) {
                break;
            }
        }
        if(!noneMatch) {
            v.forEach(cell => cell.invalid = false);
            valuesByType.forEach(cell => cell.invalid = true);
        } else {
            v.forEach(cell => cell.invalid = false);
        }
        return noneMatch;
    }

    validate = (v, currentCell) => {
        return this.validateBy('row', v, currentCell)
            && this.validateBy('square', v, currentCell)
            && this.validateBy('col', v, currentCell);
    }

    addCellValue = cellValue => {
        let values = this.state.values;
        const currentCell = values.findIndex(cell => cell.id === cellValue.id);
        if(!['', 0].includes(cellValue.value)) {
            if(currentCell === -1) {
                values.push(cellValue);
            } else {
                values[currentCell] = cellValue;
            }
        } else {
            values.splice(currentCell);
        }
        this.validate(values, cellValue);
        this.setState({ values })
    }

    componentDidMount() {
        let values = this.state.values;
        let count = 0;
        do {
            let value, currentCell;
            value = random(10, 1);
            currentCell = {
                id: random(81),
                readOnly: true,
                value
            }
            values.push(currentCell);
            count += 1;
        } while(count < 10);
        this.setState({ values });
    }

    render() {
        return (
            <Context.Provider value={{
                state: {
                    values: this.state.values
                },
                actions: {
                    addCellValue: this.addCellValue
                }
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;