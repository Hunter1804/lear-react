import { useState, useEffect } from 'react';

function formatDate(date) {
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
    const [timeNow, setTimeNow] = useState('');

    useEffect(() => {
        const setTime = setInterval(() => {
            const now = new Date();
            const dateNowString = formatDate(now);
            setTimeNow(dateNowString);
        }, 1000);

        //componet did mount
        return () => {
            clearInterval(setTime);
        };
    }, []);

    return { timeNow };
}

export default useClock;
