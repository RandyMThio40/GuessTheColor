import React,{useState,useRef, useLayoutEffect} from 'react';
import './colorsGame.css';

const genRand = (max) => {
    return Math.round(Math.random() * (max - 0) + 0)
}

const getRandomHex = () => {
    let hex = '#';
    let charCodeA = 65;
    
    for(let i = 6; i > 0; i--){
        let num = genRand(15);
        let value = num > 9 ? String.fromCharCode(charCodeA + num - 10) : `${num}`;
        hex += value
    }
    return hex
}

export const ColorsGame = () => {
    const [options,setOptions] = useState([]);
    const coloredWindow = useRef();
    const [score,setScore] = useState(0);
    const [round,setRound] = useState(0);

    const handleSubmit = (val) => {
        if(document.documentElement.style.getPropertyValue('--game-color') === val) setScore(prev=>prev+1)
        setRound(prev=>prev+1)
    }
    
    useLayoutEffect(()=>{
        const genOptions = () => {
            let arr = []
            for(let i = 0; i < 3; i++){
                arr.push(getRandomHex());
            }
            return arr
        }
        let arr = genOptions()
        setOptions(arr);
        document.documentElement.style.setProperty('--game-color',arr[genRand(arr.length-1)])
    },[round])
    return(
        <>
            <div scoreboard="" >
                {score} of {round} rounds correct
            </div>
            <div ref={coloredWindow} className="color-window">
            </div>
            <div className="color-options">
                {options.map((item,idx)=>{
                    return(
                        <button onClick={()=>handleSubmit(item)} key={idx} >{item}</button>
                    )
                })}
            </div>
        </>
    );
}

export default ColorsGame;