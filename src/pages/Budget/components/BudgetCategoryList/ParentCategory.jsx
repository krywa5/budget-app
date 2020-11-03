import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from 'utils';
import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';

const ParentCategory = ({ name, onClick, categories, transactions, amount }) => {
    const { i18n } = useTranslation()
    const activeLanguage = i18n.language;

    const categoryLeftValue = useMemo(() => {
        if (!!amount) return null;

        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0);
            } catch (error) {
                return null;
            }
        })();

        const parentCategoryTransactions = transactions
            .filter(transaction => categories.find(category => category.categoryId === transaction.categoryId));

        const spentOnParentCategory = parentCategoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;

        return totalLeft;

    }, [categories, transactions, amount]);

    const amountValue = useMemo(
        () => amount || categoryLeftValue,
        [amount, categoryLeftValue]
    );

    return (
        <Root onClick={onClick}>
            <span>{name}</span>
            <CategoryAmount negative={amountValue < 0}>
                {formatCurrency(amountValue, activeLanguage)}
            </CategoryAmount>
        </Root>
    );
}

export default ParentCategory;