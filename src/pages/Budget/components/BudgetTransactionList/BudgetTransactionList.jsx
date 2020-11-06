import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { formatCurrency, formatDate } from 'utils';

import { List, ListItem } from './BudgetTransactionList.css';

const BudgetTransactionList = ({ transactions, budgetedCategories, allCategories, selectedParentCategoryId }) => {
    const { i18n } = useTranslation()
    const activeLanguage = i18n.language;

    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return transactions;
        }

        if (selectedParentCategoryId === null) {
            return transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

                return !hasBudgetedCategory;
            })
        }

        return transactions
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
        [allCategories, budgetedCategories, selectedParentCategoryId, transactions]
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
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount, activeLanguage)}</div>
                                <div>{formatDate(transaction.date, activeLanguage)}</div>
                                <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
};



export default connect(state => ({
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);