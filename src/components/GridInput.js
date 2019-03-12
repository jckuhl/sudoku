import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './context';

const Square = styled.div`
    border: 1px solid black;
`;

const SquareInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    background-color: ${({invalid}) => invalid ? 'palevioletred': 'white'};
`;

export default function GridInput({ position }) {
    const inputRef = useRef();
    const { actions } = useContext(Context);

    const setCellValue = event => {
        event.preventDefault();
        const value = inputRef.current.value;
        actions.addCellValue({value, ...position});
    }
    
    return (
        <Square>
            <SquareInput type="number"
                invalid={position.invalid}
                maxLength="1" ref={inputRef} 
                onInput={setCellValue}
                value={position.value}
                readOnly={position.readOnly}
                />
        </Square>
    );
}