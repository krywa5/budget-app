import React from 'react';
import { Form, Field } from 'react-final-form'
import { useTranslation } from 'react-i18next';



const AddTransactionForm = ({ }) => {
  const { t } = useTranslation();

  const required = value => (value ? undefined : t('Field is required!'));

  return (
    <Form
      onSubmit={console.log}
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
          <Field name="category" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>{t('Category')}</label>
                <input {...input} type="text" placeholder={t('Category')} />
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