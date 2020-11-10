import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

import { Modal, Button } from 'components';
import { useHistory, useParams } from 'react-router-dom';

import API from 'data/fetch';
import queryCache from 'data/query/queryCache';

const DeleteTransactionForm = () => {
    const history = useHistory();
    const { id: transactionId } = useParams();
    const { t } = useTranslation();


    const [mutate] = useMutation(API.budget.deleteTransaction, {
        onSuccess: () => {
            queryCache.invalidateQueries(['budget', { id: 1 }]);
            toast.success(t('Transaction has been deleted!'), {
                position: toast.POSITION.TOP_RIGHT,
            });
            history.push("/budget");
        },
        onError: () => {
            toast.error(t('Something went wrong.'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    })

    const deleteTransactionHandler = () => {
        mutate(transactionId);
    }

    return (
        <>
            <p>Czy na pewno chcesz usunąć transakcję?</p>
            <div>
                <Button onClick={deleteTransactionHandler}>{t('Yes')}</Button>
                <Button to="/budget">{t('No')}</Button>
            </div>
        </>
    );
}

export default DeleteTransactionForm;