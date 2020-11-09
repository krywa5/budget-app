import React, { useRef, useMemo, useCallback, useContext } from 'react';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro'; // pobieramy cały katalog. To jest potrzebne do dodawanie inlinowo stylów css do styled components
import { useQuery } from 'react-query'

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

import { budgetContext } from 'data/context/budget.context';

import API from 'data/fetch';
import { SELECT_PARENT_CATEGORY_ID } from 'data/constants';

const BudgetCategoryList = () => {
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);
    const { data: budgetedCategories } = useQuery(['budgetedCategories', { id: 1 }], API.budget.fetchBudgetedCategories);

    const { dispatch } = useContext(budgetContext);

    const setSelectedParentCategoryId = useCallback(id => dispatch({
        type: SELECT_PARENT_CATEGORY_ID,
        payload: id,
    }),
        [dispatch]
    );

    const { t } = useTranslation();
    const handleClickParentCategoryRef = useRef(null);

    const budgetedCategoriesByParent = useMemo(() => groupBy(
        budgetedCategories,
        item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    ),
        [budgetedCategories, allCategories]
    );

    const handleClearParentCategorySelect = useCallback(() => {
        setSelectedParentCategoryId();
        handleClickParentCategoryRef.current();
    },
        [setSelectedParentCategoryId, handleClickParentCategoryRef]
    );
    const handleSelectRestParentCategories = useCallback(() => {
        setSelectedParentCategoryId(null);
        handleClickParentCategoryRef.current();
    },
        [setSelectedParentCategoryId, handleClickParentCategoryRef]
    );

    const listItems = useMemo(() => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => {
                    onClick(parentName);
                    setSelectedParentCategoryId(parentName);
                }}
                categories={categories}
                transactions={budget.transactions}
            />
        ),
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);

            return (<CategoryItem
                key={budgetedCategory.id}
                name={name}
                item={budgetedCategory}
                transactions={budget.transactions}
            />)
        }
        ),
    })),
        [allCategories, budget.transactions, budgetedCategoriesByParent, setSelectedParentCategoryId]
    );

    const totalSpent = useMemo(() => budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0),
        [budget.transactions]
    );

    const restToSpend = useMemo(() => budget.totalAmount - totalSpent,
        [budget.totalAmount, totalSpent]
    );

    const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.categoryId === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        return acc + Math.max(budgetedCategory.budget, categoryExpenses);
    }, 0),
        [budgetedCategories, budget.transactions]
    );

    const notBudgetedTransactions = useMemo(() => budget.transactions
        .filter(transaction => {
            return !budgetedCategories
                .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
        }),
        [budget.transactions, budgetedCategories]
    );

    const notBudgetedExpenses = useMemo(() => notBudgetedTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0),
        [notBudgetedTransactions]
    );

    const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
        [budget.totalAmount, amountTaken, notBudgetedExpenses]
    );

    return (
        <div>
            <div
                css={`
            border-bottom: 5px solid ${({ theme }) => theme.colors.grey.light};
            `}
            >
                <ParentCategory
                    name={budget.name}
                    amount={restToSpend}
                    onClick={handleClearParentCategorySelect}
                />
            </div>
            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />
            <div
                css={`
            border-top: 5px solid ${({ theme }) => theme.colors.grey.light};
            `}
            >
                <ParentCategory
                    name={t('Other categories')}
                    amount={availableForRestCategories}
                    onClick={handleSelectRestParentCategories}
                />
            </div>
        </div>
    );
}


export default BudgetCategoryList;