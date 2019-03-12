import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Grid from './components/Grid';
import GridInput from './components/GridInput';
import { Context } from './components/context';

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
    * , *:before, *:after{ 
        box-sizing:border-box; 
        -moz-box-sizing:border-box; 
        -webkit-box-sizing:border-box; 
        -ms-box-sizing:border-box;
    }
`;

export default function App() {

    const { values } = useContext(Context).state;

    const grid = ()=> {
        let outer = [];
        let position = 0;
        while(outer.length < 9) {
            let inputs = [];
            while(inputs.length < 9) {
                let innerRow = Math.floor(inputs.length / 3);
                let outerRow = Math.floor(outer.length / 3);
                let innerCol = inputs.length % 3;
                let outerCol = outer.length % 3;
                // eslint-disable-next-line no-loop-func
                const currentCell = values.find(cell => cell.id === position);
                inputs.push(
                    <GridInput position={{
                        square: currentCell ? currentCell.square : outer.length,
                        id: currentCell ? currentCell.position : position,
                        row: currentCell ? currentCell.row : innerRow + outerRow * 3,
                        col: currentCell ? currentCell.col : innerCol + outerCol * 3,
                        invalid: currentCell ? currentCell.invalid : false,
                        value: currentCell ? currentCell.value : undefined,
                        readOnly: currentCell ? currentCell.readOnly : false
                    }} key={position}/>
                );
                position += 1;
            }
            outer.push(<Grid key={outer.length}>{inputs}</Grid>)
        }
        return outer;
    };

    return (
        <React.Fragment>
            <GlobalStyle/>
            <header>

            </header>
            <MainContainer>
                <Grid size={'120px'}>
                    {grid()}
                </Grid> 
            </MainContainer>
            <footer>

            </footer>
        </React.Fragment>
    );
}
