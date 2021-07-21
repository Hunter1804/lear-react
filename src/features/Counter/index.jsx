import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './couterSlice.js';

Counter.propTypes = {
    
};

function Counter(props) {
    const dispatch = useDispatch();
    const count = useSelector(state => state.count)

    const handleClickIncrement = () => {
        const action = increment(); //action creater is a object
        console.log(action);
        dispatch(action);
    }

    const handleClickDecrement = () => {
        const action = decrement(); //action creater is a object
        console.log(action);
        dispatch(action);
    }

    return (
        <div>
            Counter : {count}

            <div>
                <button onClick={handleClickIncrement}>Increment</button>
            </div>
            <div>
                <button onClick={handleClickDecrement}>Decrement</button>
            </div>
        </div>
    );
}

export default Counter;