import React from 'react'
import Side_bar from '../../../Composant/jsx/composant_BackOffice/side_bar'
import { ContentDepartement } from './ContentBackOffice'
import Icon from '../../../Icon'
import { useState } from 'react'

function HomeDepartement() {
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
        
    <ContentDepartement headerElement={headerElement} numPage={numPage}/>
    </div>
  </>
}

export default HomeDepartement