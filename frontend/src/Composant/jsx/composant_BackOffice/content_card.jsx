import React from 'react'
import Icon from '../../../Icon'

export function Content_card({items,setNumP}) {
  
  
  return <>
    
        {items.map((item,index)=>
        <>
        <div key={index} className='container-card' onClick={()=>{
          setNumP(index)
        }}>
            <div className='icon-card'>
              <img src={item.icon} alt="" />
            </div>

            <div className='card-texte'>
                <div className='card-titre'>{item.texte}</div>
                <div className='card-description-'>{item.description}</div>
            </div>
        </div>
        </>
        )}
  </>
}

export function Card_Service({items,setNumP,setChoixService}) {
  
  
  return <>
    
        {items.map((item,index)=>
        item.nom=='Tous'?'':<>
        <div key={index} className='container-card' onClick={()=>{
          setNumP(index)
          setChoixService(item.nom)
        }}>
            <div className='icon-card'>
              <img src={Icon({pathIcon:item.icon})} alt="" />
            </div>
    
            <div className='card-texte'>
                <div className='card-titre'>{item.nom}</div>
                <div className='card-description-'>{item.description}</div>
            </div>
        </div>
        </>
        
        )}
   
  </>
}
function card_demande_offre() {
  return <>
    <div className='card_demande'>
      
    </div>
  </>
}

