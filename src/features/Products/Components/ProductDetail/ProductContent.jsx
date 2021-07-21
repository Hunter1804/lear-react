import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

ProductContent.propTypes = {
    product: PropTypes.object,
};

function ProductContent({ product = {} }) {
    const safeDescition = DOMPurify.sanitize(product.description);
    return <div style={{ padding: '15px' }} dangerouslySetInnerHTML={{ __html: safeDescition }}></div>;
}

export default ProductContent;
