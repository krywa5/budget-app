import React from 'react';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Root } from './SingleTransactionData.css';

import { formatCurrency, formatDate } from 'utils';

const SingleTransactionData = ({ transactions, budgetName, allCategories }) => {
    const { id } = useParams();

    const { t, i18n } = useTranslation();

    const { amount, categoryId, date, description } = transactions.find(transaction => transaction.id === id);

    const amountFormatted = formatCurrency(amount, i18n.language);
    const categoryName = allCategories.find(category => category.id === categoryId) ?
        t(allCategories.find(category => category.id === categoryId).name)
        : t('No category');
    const dateFormatted = formatDate(date, i18n.language);

    return (
        <Root>
            <h2>{t(description)}</h2>
            <p><span>{t('Transaction amount')}</span><span>{amountFormatted}</span></p>
            <p><span>{t('Budget name')}</span><span>{budgetName}</span></p>
            <p><span>{t('Category')}</span><span>{categoryName}</span></p>
            <p><span>{t('Date')}</span><span>{dateFormatted}</span></p>
        </Root>
    );
}

export default SingleTransactionData;
