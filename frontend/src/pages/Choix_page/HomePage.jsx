import React, { Component } from 'react'
import  Client  from "./Client";
import  Back_office  from "./Back_office";
import { Route, Routes,Link } from 'react-router-dom'

function HomePage() {
    const linkColor = {
        color:'#748B6F'
      }
    return<>
         <div className='box-ensemble'>
            <Link to="/Client/HomeClient" style={linkColor}>
            <Client/>
            </Link>

            <Link to="/Back_office/HomeBackOffice" style={linkColor}>
            <Back_office/>
            </Link>

        </div>
    </>
}



export default HomePage