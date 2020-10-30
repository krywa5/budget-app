import React from 'react';
import styled from 'styled-components';

export const WrapperContainer = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: ${({ theme }) => theme.layout.maxWidth}px;
    padding-left: ${({ theme }) => theme.spacing.sm}px;
    padding-right: ${({ theme }) => theme.spacing.sm}px;
`;

const Wrapper = ({ children }) => {
    return (
        <WrapperContainer>
            {children}
        </WrapperContainer>
    );
}



export default Wrapper;