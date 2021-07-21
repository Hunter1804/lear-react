import React from 'react';
import useMagicColor from '../../hooks/useMagicColor'

import './MagicColor.scss';

function MagicColor(props) {
    const color = useMagicColor()

    return (
        <div 
        className="box-color"
            style={{backgroundColor: color}} 
        >
            
        </div>
    );
}

export default MagicColor;