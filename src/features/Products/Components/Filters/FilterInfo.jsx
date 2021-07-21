import { Box, Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

FilterInfo.propTypes = {
    filters: PropTypes.object.isRequired,
    onchange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function FilterInfo({ filters = {}, onChange = null }) {
    const classes = useStyles();

    const filterInfos = [
        // { key: 0, label: 'Sản phẩm free ship', isRemove: false, isActive: false, isClick: true, isVisible: true },
        {
            key: 1,
            label: 'Sản phẩm free ship',
            isRemove: false,
            isActive: (filters) => filters.isFreeShip,
            isClick: true,
            isVisible: () => true,
            handleDelete: () => {},
            handleToggle: (filters) => {
                const newFilters = { ...filters };
                if (newFilters.isFreeShip) delete newFilters.isFreeShip;
                else newFilters.isFreeShip = true;
                return newFilters;
            },
        },
        {
            key: 2,
            label: `Có giảm giá`,
            isRemove: true,
            isActive: () => true,
            isClick: false,
            isVisible: (filters) => filters.isPromotion,
            handleDelete: (filters) => {
                const newFilters = { ...filters };
                delete newFilters.isPromotion;
                return newFilters;
            },
            handleToggle: () => {},
        },
        {
            key: 3,
            label: `Khoảng giá từ ${filters.salePrice_gte} - ${filters.salePrice_lte}`,
            isRemove: true,
            isActive: () => true,
            isClick: false,
            isVisible: (filters) => filters.salePrice_gte > 0 && filters.salePrice_lte > 0,
            handleDelete: (filters) => {
                const newFilters = { ...filters };
                delete newFilters.salePrice_gte;
                delete newFilters.salePrice_lte;
                return newFilters;
            },
            handleToggle: () => {},
        },
    ];

    const visibleFilter = useMemo(() => {
        return filterInfos.filter((x) => x.isVisible(filters));
    }, [filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilter.map((data) => {
                return (
                    <li key={data.key}>
                        <Chip
                            label={data.label}
                            className={classes.chip}
                            color={data.isActive(filters) ? 'primary' : 'default'}
                            clickable={data.isClick}
                            onClick={
                                !data.isClick
                                    ? null
                                    : () => {
                                          if (!onChange) return;
                                          const newFilters = data.handleToggle(filters);
                                          onChange(newFilters);
                                      }
                            }
                            onDelete={
                                !data.isRemove
                                    ? null
                                    : () => {
                                          if (!onChange) return;
                                          const newFilters = data.handleDelete(filters);
                                          onChange(newFilters);
                                      }
                            }
                        />
                    </li>
                );
            })}
        </Box>
    );
}

export default FilterInfo;
