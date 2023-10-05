import React, { useState } from 'react'
import Logo from './../../../assets/img/Logo.svg'
import './../../css/SideBar.css'
    
    function SideBar_item({items,setNumP,funcService}) {
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
                    }
                }}>
                    <div className={`active-element ${index===itemActive?"on":""}`}>.</div>
                    <img src={item.icon} alt="icon-side-bar" />
                    <div className='sideBar-text'>{item.texte}</div>
                </div>
            )}
        </>
    }

function Side_bar({items,setNumP,funcService}) {
  return <>
    <div className='sideBar-container'>
        <div className='sideBar-header'>
            <img src={Logo} alt="logo" />
        </div>
        <div className='sideBar-container-item'>
            <SideBar_item items={items} setNumP={setNumP} funcService={funcService}/>   
        </div>
      
    </div>
  </>
}

export default Side_bar