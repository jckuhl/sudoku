import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    width: auto;
    margin: 0 auto;
    grid-template-rows: 
        ${({size, repeat}) => `repeat(${repeat || 3}, ${size || '1fr'})` };
    grid-template-columns: 
        ${({size, repeat}) => `repeat(${repeat || 3}, ${size || '1fr'})` };
    border: 1px solid black;
`;


export default function Grid({ size, repeat=3, children }) {

    return (
        <GridContainer size={size} repeat={repeat}>
            {children}
        </GridContainer>
    );
}