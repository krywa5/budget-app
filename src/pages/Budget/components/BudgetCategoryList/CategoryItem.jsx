import React from 'react';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from 'utils';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css';

const CategoryItem = ({ name, item, transactions }) => {
    const { i18n } = useTranslation()
    const activeLanguage = i18n.language;

    const categoryTransactions = transactions
        .filter(transaction => transaction.categoryId === item.id);

    const spentOnCategory = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalLeft = item.budget - spentOnCategory;

    return (
        <Root>
            <span>{name}</span>
            <CategoryAmount negative={totalLeft < 0}>
                {formatCurrency(totalLeft, activeLanguage)}
            </CategoryAmount>
        </Root>
    );
}

export default CategoryItem;