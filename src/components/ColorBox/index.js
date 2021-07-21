import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './ColorBox.scss';

ColorBox.propTypes = {
    
};

function getRandomColor () {
    const COLOR_LIST = ['red', 'yellow', 'green', 'blue'];
    const index = Math.trunc(Math.random() * COLOR_LIST.length);
    return COLOR_LIST[index];
}

function ColorBox(props) {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('color') || 'red';
        return initColor;
    } );

    function handleChangeColor() {
        const newColor = getRandomColor();
        localStorage.setItem('color', newColor);
        setColor(newColor);
    }

    return (
        <div
            className="box-color"
            style={ {backgroundColor: color} }
            onClick={ handleChangeColor }
        >
            
        </div>
    );
}

export default ColorBox;