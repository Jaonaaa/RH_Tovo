import React from 'react'
import Logo from './../../../assets/img/Logo.svg'
import './../../css/SideBar.css'

    function SideBar_item({items,setNumP}) {
        return <>
            {items.map((item,key)=>
                <div className='sideBar-item' onClick={()=>{
                    if(item.texte=="Département"){
                        setNumP(-1)
                    }else if(item.texte=="Statistique"){

                    }else if(item.texte=="Annonce"){
                        setNumP(3)
                    }
                }}>
                    <div className='active-element'>.</div>
                    <img src={item.icon} alt="icon-side-bar" />
                    <div className='sideBar-text'>{item.texte}</div>
                </div>
            )}
        </>
    }

function Side_bar({items,setNumP}) {
  return <>
    <div className='sideBar-container'>
        <div className='sideBar-header'>
            <img src={Logo} alt="logo" />
        </div>
        <div className='sideBar-container-item'>
            <SideBar_item items={items} setNumP={setNumP}/>   
        </div>
      
    </div>
  </>
}

export default Side_bar