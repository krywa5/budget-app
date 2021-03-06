import styled from 'styled-components';

export const List = styled.ul`
    margin-top: 20px;

    > li+li {
        margin-top: ${({ theme }) => theme.spacing.xs}px;
    }

    li {
        margin: 0;
    }

`;

export const ListItem = styled.li`

    a {
        border: 1px solid ${({ theme }) => theme.colors.grey.dark};
        padding: ${({ theme }) => theme.spacing.xs}px;
        display: flex;
        justify-content: space-between;
        color: inherit;
        text-decoration: inherit;

        &:visited {
            color: inherit
        }

        & > :nth-child(1) {
            flex: 4;
        }

        & > :nth-child(2) {
            flex: 2;
        }

        & > :nth-child(3) {
            flex: 3;
        }

        & > :nth-child(4) {
            flex: 1;
        }
    }
`;