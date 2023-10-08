import React, { useState } from 'react'
import Logo from './../../../assets/img/Logo.svg'
import './../../css/SideBar.css'
import { Navigate } from 'react-router-dom'

    
    function SideBar_item({items,setNumP,funcService,setLog,foncSetLogin}) {
        
        const[itemActive,setItemActive] = useState(0)
        function handleSelectedItem (index) {
            setItemActive(index)
        }
        
        return <>
            {items.map((item,index)=>
                <div key={index} className={`sideBar-item ${index===itemActive?"active":""}`} onClick={()=>{
                    handleSelectedItem(index)
                    if(item.texte=="Département"){
                        setNumP(-1)
                        funcService('')
                    }else if(item.texte=="Statistique"){
                        funcService('')
                    }else if(item.texte=="Annonce"){
                        setNumP(3)
                        funcService('')
                    }else if(item.texte=="Ajout"){
                        setNumP(-1)
                        funcService('')
                    }else if(item.texte=="Liste"){
                        setNumP(1)
                        funcService('')
                    }else if(item.texte=="Deconnexion"){
                        setLog(-1)//eto lay mamono session
                        funcService('')
                        console.log("deconnexion");
                        foncSetLogin(2)
                    }
                }}>
                    <div className={`active-element ${index===itemActive?"on":""}`}>.</div>
                    <img src={item.icon} alt="icon-side-bar" />
                    <div className='sideBar-text'>{item.texte}</div>
                </div>
            )}
        </>
    }

function Side_bar({items,setNumP,funcService,setLog,foncSetLogin}) {
  return <>
    <div className='sideBar-container'>
        <div className='sideBar-header'>
            <img src={Logo} alt="logo" />
        </div>
        <div className='sideBar-container-item'>
            <SideBar_item setLog={setLog} items={items} setNumP={setNumP} funcService={funcService} foncSetLogin={foncSetLogin}/>   
        </div>
      
    </div>
  </>
}

export default Side_bar