import { useState, useEffect } from 'react';
import productAPi from '../../../api/productApi.js';

export default function useProductDetail(productId) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('run useEffect');
        (async () => {
            try {
                setLoading(true);
                const results = await productAPi.getOne(productId);
                setProduct(results);
            } catch (error) {
                console.log('fail to fetch product detail');
            }
            setLoading(false);
        })();
    }, [productId]);
    return { product, loading };
}
