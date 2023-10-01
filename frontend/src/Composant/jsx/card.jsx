import React from 'react'
import Logo from './../../assets/img/Logo.svg'
import "./../../assets/fontawesome-5/css/all.min.css";
import { Link } from 'react-router-dom'
import './../css/Card.css'
import  Fleche  from "./../../assets/img/fleche.png";


export function Card1({poste,departement,description}) {
  return <>
    
    <div className='box-card'>
        <div className='card-header'>
            <img src={Logo} alt="logo" />
            <div className='card-departement'><span>{departement}</span></div>
        </div>
        <div className='card-title'>{poste}</div>
       <div className='card-description'>{description}</div>
       <div className='box-icon'>
          <img src={Fleche} alt="fleche" />
       </div>
    </div>
  </>
}

export function Card({poste,departement,description,setAnnonce,id}) {
  return <>
    
    <div className='box-card' onClick={()=>{
      
      setAnnonce(id)
    }}>
        <div className='card-header'>
            <img src={Logo} alt="logo" />
            <div className='card-departement'><span>{departement}</span></div>
        </div>
        <div className='card-title'>{poste}</div>
       <div className='card-description'>{description}</div>
       <div className='box-icon'>
          <img src={Fleche} alt="fleche" />
       </div>
    </div>
  </>
}

