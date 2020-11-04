import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { formatCurrency, formatDate } from 'utils';

import { List, ListItem } from './BudgetTransactionList.css';

const BudgetTransactionList = ({ transactions, allCategories }) => {
    const { i18n } = useTranslation()
    const activeLanguage = i18n.language;

    const groupedTransactions = groupBy(
        transactions,
        transaction => new Date(transaction.date).getUTCDate()
    );


    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <li>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem>
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
    allCategories: state.common.allCategories,
}))(BudgetTransactionList);