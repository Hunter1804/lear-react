import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productAPi from '../../../api/productApi.js';
import ProductFilters from '../Components/ProductFilters.jsx';
import FilterInfo from './../Components/Filters/FilterInfo';
import ProductList from './../Components/ProductList';
import ProductListSkeleton from './../Components/ProductListSkeleton';
import ProductSort from './../Components/ProductSort';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },

    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px',
    },
}));

function ListPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 120,
        page: 1,
    });
    // const [filter, setFilter] = useState({
    //     _page: 1,
    //     _limit: 12,
    //     _sort: 'salePrice:ASC',
    // });

    useEffect(() => {
        try {
            (async () => {
                const { data, pagination } = await productAPi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
                // console.log(data);
            })();
        } catch (error) {
            console.log('Fail fetch api productAPi');
        }
        setLoading(false);
    }, [queryParams]);

    const handleClickPagination = (e, page) => {
        // setFilter((prevState) => ({
        //     ...prevState,
        //     _page: page,
        // }));
        const filters = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (newValueSort) => {
        // setFilter((prevState) => ({
        //     ...prevState,
        //     _sort: newValueSort,
        // }));
        const filters = {
            ...queryParams,
            _sort: newValueSort,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
        // setFilter((prevState) => ({
        //     ...prevState,
        //     ...newFilters,
        // }));

        const filters = {
            ...queryParams,
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };

    const setNewFilter = (newFilters) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        });
        // setFilter(newFilters);
    };

    return (
        <Box paddingTop={4}>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper>
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <FilterInfo filters={queryParams} onChange={setNewFilter} />
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            {loading ? <ProductListSkeleton length={12} /> : <ProductList data={productList} />}

                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    color="primary"
                                    page={pagination.page}
                                    onChange={handleClickPagination}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
