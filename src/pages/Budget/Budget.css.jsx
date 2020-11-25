import styled from 'styled-components';

export const Grid = styled.div`
    display: flex;

    section {
        position: relative;
        
        &:nth-child(1) {
            flex: 4;
        }
        &:nth-child(2) {
            flex: 8;
            margin-left: 20px;
        }
    }
`;