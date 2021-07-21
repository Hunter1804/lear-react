import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { onChange, filters } = props;
    // const [] = useState();
    const handleChangeCategory = (categoryId) => {
        if (!onChange) return;
        const newFilters = {
            'category.id': categoryId,
        };
        onChange(newFilters);
    };

    const handleChangeFilter = (filterPrice) => {
        console.log(filterPrice);
        if (onChange) onChange(filterPrice);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleChangeCategory} />
            <FilterByPrice onChange={handleChangeFilter} />
            <FilterByService filters={filters} onChange={handleChangeFilter} />
        </Box>
    );
}

export default ProductFilters;
