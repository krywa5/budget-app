import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Wrapper, Button } from 'components';
import { Container, List, NavigationWrapper } from './Navigation.css';
import { useTranslation } from 'react-i18next';



const Navigation = ({ items = [], RightElement }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Button variant="inline" to={item.to}>{t(item.content)}</Button>
                        </li>
                    ))}
                </List>
                {RightElement}
            </NavigationWrapper>
        </Container>
    );
};

// Deklaracja typów propsów
Navigation.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Navigation;