import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Item = React.memo(({ item, onClickHandler, isActive }) => (
    <div>
        <item.Trigger onClick={onClickHandler} />
        {isActive && item.children}
    </div>
));

const ToggleableList = ({ items, clickRef }) => {
    const [selectedItem, setSelectedItem] = useState(false);

    const hideElement = () => setSelectedItem(false);

    useEffect(() => {
        clickRef.current = hideElement;
    }, [clickRef, setSelectedItem]);

    return (
        <>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    onClickHandler={setSelectedItem}
                    isActive={selectedItem === item.id}
                />
            ))}
        </>
    );
}

ToggleableList.propTypes = {
    items: PropTypes.array
}

export default React.memo(ToggleableList);