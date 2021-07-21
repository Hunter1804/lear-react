import React, { useEffect, useState } from 'react';
import categoryApi from './../../../../api/categoryApi';
import { PropTypes } from 'prop-types';
import { makeStyles, Typography, Box } from '@material-ui/core';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: theme.spacing(1),
            transition: 'all 200ms',

            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.main,
            },
        },
    },
}));

function FilterByCategory({ onChange }) {
    const classes = useStyles();

    const [listCate, setListCate] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApi.getAll();
                const listCategory = response.map((category) => ({
                    id: category.id,
                    name: category.name,
                }));
                setListCate(listCategory);
            } catch (error) {}
        })();
    }, []);

    const handleClickCategory = (category) => {
        if (!onChange) return;
        onChange(category.id);
    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle1">Danh mục sản phẩm</Typography>
            <ul className={classes.menu}>
                {listCate.map((category) => (
                    <li key={category.id} onClick={() => handleClickCategory(category)}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
