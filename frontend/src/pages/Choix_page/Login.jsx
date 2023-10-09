import React, { useEffect } from 'react'
import './../../assets/css/Login.css'
import { InputPerso,ButtonPerso } from '../../Composant/jsx/cv_content'
import Log from './../../assets/img/log.jpg'
import Logo from './../../assets/img/Logo.svg'
import { useState } from 'react'
import HomeDepartement from './Back__office/HomeDepartement'
import HomeBackOffice from './Back__office/HomeBackOffice'
import { Navigate,Route, Routes } from 'react-router-dom'
import { Fetch } from '../../Fetch'
import { useNavigate } from 'react-router-dom'
function Login({log,setLog,foncSetLogin}) {
    foncSetLogin(-1)
    var login = -1
    const [formData, setFormData] = useState({
        email:'',
        mdp:''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const navigate = useNavigate;
      const handleSubmit = async (e) => {
        e.preventDefault();
        
       
       
        const formDataObject = new FormData();
        
        formDataObject.append('email', formData.email);
        formDataObject.append('mdp', formData.mdp);

        // console.log(formData.email,formData.mdp);
        
    
        
        
        const dataLoging = await fetch('http://localhost:3202/login_in', {
          method: 'POST',
          body: formDataObject,

        })

        var result = await dataLoging.json()
        console.log(result);

        // console.log(result);
          // .then(response => response.json())
          // .then(data => {
          //   console.log(data);
            if(formData.email==="rh_dep@gmail.com"){
              
              login = 1
                  // setLog(1)
                  // console.log(login);
              }else if(formData.email===result.data.email){
                login = 0
                  // setLog(0)
              }
              
          // })
          // .catch(error => {
          //   console.error(error);
          // });
          
          
          setTimeout(() => {
              if(login==0){
                console.log(login);
                // navigate("/Back_office/HomeDepartment")
              
                window.location="/Back_office/HomeDepartment"
                  // return <Navigate to="/Back_office/HomeDepartment"  />
              }else if(login==1){
                console.log(login);
                window.location="/Back_office/HomeBackOffice"
                // navigate("/Back_office/HomeBackOffice")
                  // return <Navigate to="/Back_office/HomeBackOffice"  />
              }
          }, 10000);
        // checkLogin({data:formData,setLog:setLog})
        
      };

      
        
        
      
        
  return <>
  
 <div className='login-container'>
            <div className='left'>
                    <div className=''>
                        <img src={Logo} alt="" />
                    </div>
                    <form action="" method="" onSubmit={handleSubmit}>
                        <div className='bloc-texte'>
                            <div className='_1'>Welcome back</div>
                            <div className='_2'>Welcome back please enter your details</div>
                        </div>
                        <InputPerso fonction={handleChange}  type={"email"} classN={"inputLoginNom"} couleurLabel={"loginLabelInput"} name={"email"} labelTexte={"Email"} />
                        <InputPerso fonction={handleChange} type={"password"} classN={"inputLoginMdp"} couleurLabel={"loginLabelInput"} name={"mdp"} labelTexte={"Password"} />
                        <ButtonPerso type={"submit"} texte={"Sign in"} classN={"btn-perso"} container_class={"container-btn"}/>
                    </form>
                </div>

                <div className='right'>
                    <img src={Log} alt="" />
                </div>
        </div>


  
  
  
  </>
}

export default Login