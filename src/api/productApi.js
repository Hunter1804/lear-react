import axiosClient from './axiosClient';

const productAPi = {
    async getAll(params) {
        let _page = 0;
        let _limit = 50;
        if (params) {
            _page = params._page;
            _limit = params._limit || 10;
        }
        // console.log('params', params);
        // Transform _page to _start
        const newParams = { ...params };
        newParams._start = _page <= 1 ? 0 : (_page - 1) * _limit;
        console.log('newParams', newParams);
        // Remove un-needed key
        delete newParams._page;

        // Fetch product list + count
        const productList = await axiosClient.get('/products', { params: newParams });
        const count = await axiosClient.get('/products/count', { params: newParams });

        // Build response and return
        return {
            data: productList,
            pagination: {
                page: _page,
                limit: _limit,
                total: count,
            },
        };
    },

    getOne(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/products`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient.pactch(url, data);
    },

    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productAPi;
