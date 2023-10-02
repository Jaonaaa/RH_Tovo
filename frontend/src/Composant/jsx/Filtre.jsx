import React, { useState } from 'react'
import './../css/Filtre.css'
import "./../../assets/fontawesome-5/css/all.min.css";


function DropDown({id,tab=[],setCategory}) {
    let datas = tab 

    const[openD,setOpenD] = useState('close')

    function toggle() {
      if(openD=='close'){
        setOpenD('open')
      }else{
        setOpenD('close')
      }
    }

    return <>
      <div className='dropdown-container'>
        <div className='default-content' onClick={toggle}>
          <div className='default-text'>Département</div>
          <i className='fas fa-caret-down'></i>
        </div>

        <div className={`box-content ${openD}`}>
          {datas.map((data,index)=>
              <div key={index} className='dropdown-content' onClick={()=>{
                setCategory(data.departement)
              }}>{data.departement}</div>
          )}
        </div>
        
        
      </div>
    </>
}
function Filtre({id,tabs=[],setCategory}) {
    console.log(tabs);
  return <>
    <div className='box-filtre'>
        <DropDown id={id} tab={tabs} setCategory={setCategory}/>
    </div>
    
  </>
    
  
}

export default Filtre