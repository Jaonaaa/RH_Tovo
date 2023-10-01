import React from 'react'

export function Content_card({items,setNumP}) {
  
  
  return <>
    
        {items.map((item)=>
        <>
        <div className='container-card' onClick={()=>{
          setNumP(item.id)
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

export function Card_Service({items}) {
  
  
  return <>
    
        {items.map((item)=>
        item.departement=='Tous'?'':<>
        <div className='container-card'>
            <div className='icon-card'>
              <img src={item.icon} alt="" />
            </div>
    
            <div className='card-texte'>
                <div className='card-titre'>{item.departement}</div>
                <div className='card-description-'>{item.description}</div>
            </div>
        </div>
        </>
        
        )}
   
  </>
}

