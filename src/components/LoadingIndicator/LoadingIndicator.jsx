import React from 'react';
import styled, { keyframes } from 'styled-components';

const loaderAnim = keyframes`
    0% {
        top: 8px;
        height: 64px;
    }
    50%, 100% {
        top: 24px;
        height: 32px;
    }
`;

const Root = styled.div`
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80px;
    height: 80px;
    margin: ${({ theme }) => theme.spacing.xl}px;
`;

const Content1 = styled.div`
    display: inline-block;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.red.normal};
    width: 16px;
    animation: ${loaderAnim} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    left: 8px;
    animation-delay: 0;
`;

const Content2 = styled.div`
    display: inline-block;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.red.normal};
    width: 16px;
    animation: ${loaderAnim} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    left: 32px;
    animation-delay: 0.12s;
`;

const Content3 = styled.div`
    display: inline-block;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.red.normal};
    width: 16px;
    animation: ${loaderAnim} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    left: 56px;
    animation-delay: 0.24s;
`;

const LoadingIndicator = () => {
    return (
        <Root>
            <Content1 />
            <Content2 />
            <Content3 />
        </Root>
    );
}

export default LoadingIndicator;