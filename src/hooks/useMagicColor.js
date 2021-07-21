import {useState, useEffect, useRef} from 'react';

function getRandomColor (currentColor) {
    const COLOR_LIST = ['red', 'yellow', 'green', 'blue'];
    let color = currentColor
    while(color == currentColor) {
        
        const index = Math.trunc(Math.random() * COLOR_LIST.length);
        color = COLOR_LIST[index];
    }
    
    return color;
}

//useRef luu gia tri cua lan render truoc
function ColorBox(props) {
    const [color, setColor] = useState('transparent');
    const currentColor = useRef('transparent')

    useEffect(() => {
        const setNewColor = setInterval(()=>{
            const newColor = getRandomColor(currentColor);
            setColor(newColor);
            currentColor.current = newColor
        }, 1000)
        return () => {
            clearInterval(setNewColor)
        };
    }, []);

  

    return color;
}

export default ColorBox;