import React from 'react';
import { useTranslation } from 'react-i18next';
import { Root } from './ErrorParagraph.css';

const ErrorParagraph = ({ message }) => {
    const { t } = useTranslation();

    const messageInt = message ? t(message) : t('There is a problem with something...');

    return (
        <Root role="alert">
            {messageInt}
        </Root>
    );
}

export default ErrorParagraph;