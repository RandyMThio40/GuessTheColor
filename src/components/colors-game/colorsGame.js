import React,{useState,useRef, useLayoutEffect, useEffect} from 'react';
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
    const animatedBG = useRef();
    const TDuration = 800
    const prevColor = useRef(undefined)

    const handleSubmit = (val,e) => {
        if(document.documentElement.style.getPropertyValue('--game-color') === val) e.target.style.color = "green"
        animatedBG.current.style.backgroundColor = val
        animatedBG.current.style.setProperty('--clip-value',`200%`)
        animatedBG.current.style.transitionDuration = `${TDuration}ms`;
        setTimeout(()=>{
            if(document.documentElement.style.getPropertyValue('--game-color') === val) setScore(prev=>prev+1)
            prevColor.current = val;
            setRound(prev=>prev+1)
        },TDuration)
    }

    const getCoordinates = (e) => {
        animatedBG.current.style.setProperty('--x',`${e.pageX}px`);
        animatedBG.current.style.setProperty('--y',`${e.pageY}px`);
    }

    const resetBG = () => {
        animatedBG.current.style.transitionDuration = `0ms`;
        animatedBG.current.style.setProperty('--clip-value',`0%`)
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
        resetBG()
        document.documentElement.style.setProperty('--game-color',arr[genRand(arr.length-1)])
        return(()=>{

            document.body.style.backgroundColor = prevColor.current
        })
    },[round])

    return(
        <>  
            <div ref={animatedBG} className='animatedBg'></div>
            <div scoreboard="" >
                {score} of {round} rounds correct
            </div>
            <div ref={coloredWindow} className="color-window">
            </div>
            <div className="color-options">
                {options.map((item,idx)=>{
                    return(
                        <button onTouchStart={(e)=>{console.log("touch start",e.touches)}} onTouchMove={(e)=>{console.log("touch move",e.touches)}} onMouseMove={getCoordinates} onClick={(e)=>handleSubmit(item,e)} key={idx} >{item}</button>
                    )
                })}
            </div>
        </>
    );
}

export default ColorsGame;