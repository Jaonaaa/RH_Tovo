import React, { Component, useState } from 'react';
import {render} from 'react-dom'


function Compteur(){
    const [count, setCount] = useState(0)
    const increment = () =>{
        setCount(count+1)
    }
    return <>
        <p>Compteur : {count}</p>
        <button onClick={increment}>Incrémenter</button>
    </>
}
export default Compteur
    
