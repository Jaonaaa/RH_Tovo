import React, {useState } from 'react';



export function Form() {
    const [mail, setMail] = useState('')
    const [mdp, setMdp] = useState('')
    const handlechange = (e)=>{
        setMail(e.target.value)
        setMdp(e.target.value)
    }
    return <form >
        <div className='form-composant'>
            <label htmlFor="email">E-mail</label>
            <input type="mail" id='email' name="nom" defaultValue={"Sergio"} onChange={handlechange}/>
        </div>
        <div className='form-composant'>
            <label htmlFor="mdp">Password</label>
            <input type="password" id='mdp' name="mdp" onChange={handlechange}/>
        </div>
    </form> 
}