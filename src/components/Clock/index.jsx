import React from 'react';
import useClock from '../../hooks/useClock'


function Clock() {

    const {timeNow} = useClock()

    return (
        <div>
            <p>{timeNow}</p>       
        </div>
    );
}

export default Clock;