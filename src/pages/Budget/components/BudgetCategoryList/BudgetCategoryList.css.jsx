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