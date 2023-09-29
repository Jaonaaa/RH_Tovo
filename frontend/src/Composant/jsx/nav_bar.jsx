import React from 'react'
import { Link } from 'react-router-dom'
import './../css/Nav_bar.css'
import Logo from './../../assets/img/Logo.svg'
import "./../../assets/fontawesome-5/css/all.min.css";

function SearchBar() {
  return <>
    <div className='box-search-bar'>
    <i className='fas fa-search'></i>
    <input type="text" name="" id="" placeholder='Rechercher...'/>
    </div>
  </>
}

export function Nav_bar({search_bar}) {
  const datas= [
    {label:"Acceuil",path:"/HomeClient"},
    {label:"Annonce",path:"/Annonce"},
    {label:"Entretien",path:"Entretien"}
  ]
  return <>
    <nav>
      
      <div className='logo'>
        <Link>
          <img src={Logo} alt="" />
        </Link>
      </div>
      
      <div className='nav-component'>
        {datas.map((data)=> 
          <Link to={data.path}>
            <div className='nav-content'>{data.label}</div>
          </Link>  
        )}
      </div>
      {search_bar?<SearchBar/>:''}
    </nav>
  </>
}

export default Nav_bar