import styled from 'styled-components';

export const Category = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ theme }) => theme.colors.grey.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
`;

export const ParentCategory = styled(Category)`
    background-color: ${({ theme }) => theme.colors.grey.normal};
`;

export const CategoryItem = styled(Category)`
    background-color: ${({ theme }) => theme.colors.grey.light};
`;

export const CategoryAmount = styled.span`
    font-weight: 700;
    color: ${({ theme, negative }) => negative ? theme.colors.red.normal : theme.colors.green.normal}
`;