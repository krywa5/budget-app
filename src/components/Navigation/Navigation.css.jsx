import styled from 'styled-components';

export const Container = styled.nav`
    display: flex;
    background-color: ${({ theme }) => theme.colors.grey.light};
    padding: ${({ theme }) => theme.spacing.sm}px 0;
    justify-content: space-between;
`;

export const List = styled.ul`
    display: flex;
`;