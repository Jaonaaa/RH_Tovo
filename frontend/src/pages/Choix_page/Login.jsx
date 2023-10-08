import React from 'react'
import './../../assets/css/Login.css'
import { InputPerso,ButtonPerso } from '../../Composant/jsx/cv_content'
import Log from './../../assets/img/log.jpg'
import Logo from './../../assets/img/Logo.svg'
import { useState } from 'react'
import HomeDepartement from './Back__office/HomeDepartement'
import HomeBackOffice from './Back__office/HomeBackOffice'
import { Navigate,Route, Routes } from 'react-router-dom'
// function checkLogin({data,setLog}) {
    
//     if(data.nom==="Sergio"){
//         setLog(0)
//         return <Navigate to="/Back_office/HomeDepartment" />

//     }else if(data.nom==="Paul"){
//         setLog(1)
//         return <Navigate to="/Back_office/HomeBackOffice"  />
//     }else{
//         setLog(2)
//     }
// }
function Login({log,setLog,foncSetLogin}) {
    foncSetLogin(-1)
    const [formData, setFormData] = useState({
        nom: '',
        mdp:''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
       
       
        const formDataObject = new FormData();
    
        formDataObject.append('email', formData.nom);
        formDataObject.append('mdp', formData.mdp);
       
    
        
    
        fetch('http://localhost:3202/login_in', {
          method: 'POST',
          body: formDataObject,

        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
        try{
            // if(formData.nom==="Sergio"){
            //     console.log(formData);
            //     setLog(0)
            // }else if(formData.nom==="Paul"){
            //     setLog(1)
            // }
        }catch (error){

        }
        
        // checkLogin({data:formData,setLog:setLog})
        
      };

        if(log==0){
            return <Navigate to="/Back_office/HomeDepartment"  />
        }else if(log==1){
            return <Navigate to="/Back_office/HomeBackOffice"  />
        }
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
                        <InputPerso fonction={handleChange}  type={"text"} classN={"inputLoginNom"} couleurLabel={"loginLabelInput"} name={"nom"} labelTexte={"Nom"} />
                        <InputPerso fonction={handleChange} type={"password"} classN={"inputLoginMdp"} couleurLabel={"loginLabelInput"} name={"mdp"} labelTexte={"Password"} />
                        <ButtonPerso type={"submit"} texte={"Sign in"} classN={"btn-perso"} container_class={"container-btn"}/>
                    </form>
                </div>

                <div className='right'>
                    <img src={Log} alt="" />
                </div>
        </div>


  {/* <Routes >
    <Route path="/Back_office">
        <Route path='HomeDepartment' element={<HomeDepartement />}/>
        <Route path='HomeBackOffice' element={<HomeBackOffice setLog={setLog}/>}/>
    </Route>

    <Route path='/HomeDepartment' element={<HomeDepartement setLog={setLog}/>}/>
    <Route path='/HomeBackOffice' element={<HomeBackOffice setLog={setLog}/>}/>
  </Routes> */}
  
  
  
  </>
}

export default Login