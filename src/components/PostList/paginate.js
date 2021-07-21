import React from 'react';
import PropTypes from 'prop-types';

Paginate.propTypes = {
    paginate: PropTypes.object.isRequired,
    onChangePage: PropTypes.func,
};

Paginate.defaultProps = {
    onChangePage: null
}

function Paginate(props) {
    const {paginate, onChangePage} = props;
    const {_page, _limit, _totalRows} = paginate;
console.log({onChangePage})
    const totalPage = Math.ceil(_totalRows / _limit);
    function handleChangePage(page) {
        if(onChangePage) {onChangePage(page);}
    }
    return (
        <div>
            <button
                disabled={_page<=1}
                onClick={ () => handleChangePage(_page - 1)}
            >
                Prev
            </button>

            <button
                disabled={_page >= totalPage}
                onClick={() => handleChangePage(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Paginate;
