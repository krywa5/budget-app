import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Item = ({ item, onClickHandler, isActive }) => (
    <div>
        <item.Trigger onClick={onClickHandler} />
        {isActive && item.children}
    </div>
)

const ToggleableList = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState();
    // const [isActive, setIsActive] = useState(false);

    // const toggleActive = () => setIsActive(prevVal => !prevVal);

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

export default ToggleableList;