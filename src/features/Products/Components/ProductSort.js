import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort(props) {
    const { currentSort, onChange } = props;

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    };
    return (
        <Tabs value={currentSort} indicatorColor="primary" textColor="primary" onChange={handleSortChange}>
            <Tab label="Sắp xếp từ cao tới thấp" value="salePrice:ASC"></Tab>
            <Tab label="Sắp xếp từ thấp tới cao" value="salePrice:DESC"></Tab>
        </Tabs>
    );
}

export default ProductSort;
