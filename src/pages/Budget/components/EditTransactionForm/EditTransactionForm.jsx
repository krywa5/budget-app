import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { groupBy, noop } from 'lodash';

const EditTransactionForm = ({ onSubmit = noop, transactions, categories, groupCategoriesBy }) => {
    const { t } = useTranslation();
    const { id } = useParams();

    const { amount, categoryId, date, description } = transactions.find(transaction => transaction.id === id);

    const required = value => (value ? undefined : t('Field is required!'));

    const groupedCategoriesByParentName = groupCategoriesBy
        ? groupBy(categories, groupCategoriesBy)
        : null;

    const categoryItems = useMemo(
        () => groupedCategoriesByParentName
            ? Object.entries(groupedCategoriesByParentName)
                .map(([parentName, categories]) => (
                    <optgroup key={parentName} label={t(parentName)}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{t(category.name)}</option>
                        ))}
                    </optgroup>
                ))
            : categories.map(category => (
                <option value={category.id}>{t(category.name)}</option>
            )),
        [categories, groupedCategoriesByParentName, t]
    );

    return (
        <>
            <h2>{t('Transaction edition')}</h2>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="description" validate={required} defaultValue={description}>
                            {({ input, meta }) => {
                                return (
                                    <div>
                                        <label>{t('Description')}</label>
                                        <input {...input} type="text" placeholder={t('Description')} />
                                        {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
                                    </div>
                                )
                            }}
                        </Field>
                        <Field name="amount" validate={required} defaultValue={amount} parse={value => Number(value)}>
                            {({ input, meta }) => (
                                <div>
                                    <label>{t('Amount')}</label>
                                    <input {...input} type="number" step="0.01" placeholder={t('Amount')} />
                                    {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="categoryId" validate={required} defaultValue={categoryId}>
                            {({ input, meta }) => (
                                <div>
                                    <label>{t('Category')}</label>
                                    <select {...input}>
                                        {categoryItems}
                                    </select>
                                    {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="date" validate={required} defaultValue={date.slice(0, 10)}>
                            {({ input, meta }) => (
                                <div>
                                    <label>{t('Date')}</label>
                                    <input {...input} type="date" placeholder={t('Date')} />
                                    {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div className="buttons">
                            <button type="submit" disabled={submitting}>
                                {t('Submit')}
                            </button>
                        </div>
                    </form>
                )}
            />
        </>
    )
}

export default EditTransactionForm;