import React, { useMemo, useContext } from 'react';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query'

import { formatCurrency, formatDate } from 'utils';

import { List, ListItem } from './BudgetTransactionList.css';
import { Link } from 'react-router-dom';

import API from 'data/fetch';
import { budgetContext } from 'data/context/budget.context';


const BudgetTransactionList = () => {
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);
    const { data: budgetedCategories } = useQuery(['budgetedCategories', { id: 1 }], API.budget.fetchBudgetedCategories);

    const { selectedParentCategoryId } = useContext(budgetContext);

    const { i18n } = useTranslation()
    const activeLanguage = i18n.language;

    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return budget.transactions;
        }

        if (selectedParentCategoryId === null) {
            return budget.transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

                return !hasBudgetedCategory;
            })
        }

        return budget.transactions
            .filter(transaction => {
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);

                    const parentCategoryName = category.parentCategory.name;

                    return parentCategoryName === selectedParentCategoryId;
                } catch (error) {
                    return false;
                }
            })
    },
        [allCategories, budgetedCategories, selectedParentCategoryId, budget.transactions]
    );

    const groupedTransactions = useMemo(() => groupBy(
        filteredTransactionsBySelectedParentCategory,
        transaction => new Date(transaction.date).getUTCDate()
    ),
        [filteredTransactionsBySelectedParentCategory]
    );


    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <li key={key}>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem key={transaction.description}>
                                <Link to={`/budget/transaction/${transaction.id}`}>
                                    <div>{transaction.description}</div>
                                    <div>{formatCurrency(transaction.amount, activeLanguage)}</div>
                                    <div>{formatDate(transaction.date, activeLanguage)}</div>
                                    <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                                </Link>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
};


export default BudgetTransactionList;