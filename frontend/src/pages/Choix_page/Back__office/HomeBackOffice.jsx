import React from 'react'
import { useState } from 'react'
import Stat from './../../../assets/img/stat.svg'
import Service from './../../../assets/img/service.svg'

import Ajout from './../../../assets/img/ajout.svg'
import Liste from './../../../assets/img/liste.svg'
import Annonce from './../../../assets/img/annonce.svg'


import Juridique from './../../../assets/img/juridique.svg'
import It from './../../../assets/img/it.svg'
import Marketing from './../../../assets/img/marketing.svg'
import Rh from './../../../assets/img/humain.svg'

import Side_bar from './../../../Composant/jsx/composant_BackOffice/side_bar';
import ContentBackOffice from './ContentBackOffice'

function HomeBackOffice() {
    const dataSideBar = [
        {texte:'Département',icon:Service},
        {texte:'Annonce',icon:Annonce},
        {texte:'Statistiques',icon:Stat}
    ]
    const contentService = [
        {texte:'Ajout',icon:Ajout,description:'Ajout de nouveaux départements',id:0},
        {texte:'Liste',icon:Liste,description:'La liste des départements qui existent',id:1}
    ]
    const contentAnnonce = [
      {departement:'Tous'},
        {poste:'Testeur',departement:'IT',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
        {poste:'Infirmier en chef',departement:'Juridique',description:'Nous cherchons un infifirmier en chef'},
        {poste:'Dev senior',departement:'Marketing',description:'Nous cherchons un dev senior pour la création de mobile Application'},
        {poste:'Testeur',departement:'RH',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
        {poste:'Infirmier en chef',departement:'IT',description:'Nous cherchons un infifirmier en chef'},
        {poste:'Dev senior',departement:'Juridique',description:'Nous cherchons un dev senior pour la création de mobile Application'}
  ]
    const listeService = [
      {departement:'Tous'},
      {departement:'IT',icon:Ajout,description:'Département informatique'},
      {departement:'Juridique',icon:Juridique,description:'Département juridique'},
      {departement:'Marketing',icon:Marketing,description:'Département marketing'},
      {departement:'RH',icon:Rh,description:'Département des ressources humaines'}
  ]
    const headerElement = ['Département']

    const[numPage,setNumP] = useState(-1)
  return <>
    <div className='dash-board-container'>
        <Side_bar items={dataSideBar} setNumP={setNumP}/>
        
        <ContentBackOffice items={contentService} items_annonce={contentAnnonce} headerElement={headerElement} items_service={listeService} numPage={numPage} setNumP={setNumP}/>
    </div>
  </>
}

export default HomeBackOffice