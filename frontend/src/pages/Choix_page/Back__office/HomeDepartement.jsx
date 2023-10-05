import React, { useEffect } from 'react'
import Side_bar from '../../../Composant/jsx/composant_BackOffice/side_bar'
import { ContentDepartement } from './ContentBackOffice'
import Icon from '../../../Icon'
import { useState } from 'react'
import Fetch from '../../../Fetch'
import { Fetch2 } from '../../../Fetch'


function HomeDepartement() {
  const idDep = 1
  const dataD =  Fetch2({path:"/getRequestByDepartement",idD:idDep})
  const [dataDemande,setDataDemande] = useState(dataD)
  useEffect(()=>{
    dataD.then((data)=>{
      setDataDemande(data.data)
    })
  },[])
 


    const dataSideBar = [
        {texte:'Ajout',icon:Icon({pathIcon:"ajout"})},
        {texte:'Liste',icon:Icon({pathIcon:"liste"})}
    ]
    const[numPage,setNumP] = useState(-1)
    const[choixService,setChoixService] = useState('null')
    const headerElement = [
        {texte:'Département',id:1},
        {texte:'Ajout',id:0}
    ]
  return <>
    <div className='dash-board-container'>
    <Side_bar items={dataSideBar} setNumP={setNumP} funcService={setChoixService}/>
        
    <ContentDepartement headerElement={headerElement} numPage={numPage} dataDemande={dataDemande} idD={idDep}/>
    </div>
  </>
}

export default HomeDepartement