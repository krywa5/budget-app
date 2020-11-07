import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form'
import { useTranslation } from 'react-i18next';
import { groupBy, noop } from 'lodash';



const AddTransactionForm = ({ onSubmit = noop, categories, groupCategoriesBy }) => {
  const { t } = useTranslation();

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
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="description" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>{t('Description')}</label>
                <input {...input} type="text" placeholder={t('Description')} />
                {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="amount" validate={required} parse={value => Number(value)}>
            {({ input, meta }) => (
              <div>
                <label>{t('Amount')}</label>
                <input {...input} type="number" step="0.01" placeholder={t('Amount')} />
                {meta.error && meta.touched && <span role="alert">{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="categoryId" validate={required}>
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
          <Field name="date" validate={required}>
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
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              {t('Reset')}
            </button>
          </div>
        </form>
      )}
    />
  );
}

export default AddTransactionForm;