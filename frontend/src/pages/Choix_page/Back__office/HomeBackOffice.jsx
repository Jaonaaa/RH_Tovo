import React from 'react'
import { useState } from 'react'





import Juridique from './../../../assets/img/juridique.svg'
import It from './../../../assets/img/it.svg'
import Marketing from './../../../assets/img/marketing.svg'
import Rh from './../../../assets/img/humain.svg'


import Side_bar from './../../../Composant/jsx/composant_BackOffice/side_bar';
import { ContentBackOffice } from './ContentBackOffice'
import { Fetch } from '../../../Fetch'
import Icon from '../../../Icon'
import { useEffect } from 'react'
import { Fetch2 } from '../../../Fetch'
import { logDOM } from '@testing-library/react'
import { Navigate } from 'react-router-dom'


let listeService = [
  {nom:'Tous'},
]
let contentAnnonce = [
    {nom:'Tous'}, 
    {poste:'Testeur',nom:'IT',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
    {poste:'Infirmier en chef',nom:'Juridique',description:'Nous cherchons un infirmier en chef'},
    {poste:'Dev senior',nom:'Marketing',description:'Nous cherchons un dev senior pour la création de mobile Application'},
    {poste:'Testeur',nom:'RH',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
    {poste:'Infirmier en chef',nom:'IT',description:'Nous cherchons un infifirmier en chef'},
    {poste:'Dev senior',nom:'Juridique',description:'Nous cherchons un dev senior pour la création de mobile Application'}
]


 function HomeBackOffice({setLog,foncLogin,foncSetLogin}) {
  
    const dataDep =  Fetch({path:"/getAllDepartement",method:"GET"})
    const allDemande = Fetch({path:"/getRequestAllDepartement",method:"POST"})
    
    const [dataDemande,setDataDemande] = useState(allDemande)
    const [listeServices,setListeService] = useState(listeService)
    useEffect(()=>{
      // data demande service
      allDemande.then((dataDS)=>{
          setDataDemande(dataDS.data)
          // console.log(dataDS.data);
      })

      // data service
     let dataService = [...listeServices]
      dataDep.then((data)=>{
        // console.log(data);
        data.data.forEach(de => {
         dataService.push(de)
          // console.log(de);
      })
      setListeService(dataService)
      // console.log(listeServices);
      });
    },[])
 
   

    const dataSideBar = [
        {texte:'Département',icon:Icon({pathIcon:"service"})},
        {texte:'Annonce',icon:Icon({pathIcon:"annonce"})},
        {texte:'Entretien',icon:Icon({pathIcon:"entretien"})},
        {texte:'Statistiques',icon:Icon({pathIcon:"stat"})},
        {texte:'Deconnexion',icon:Icon({pathIcon:"deconnexion"})}
    ]

    const contentService = [
        {texte:'Ajout',icon:Icon({pathIcon:"ajout"}),description:'Ajout de nouveaux départements',id:0},
        {texte:'Liste',icon:Icon({pathIcon:"liste"}),description:'La liste des départements qui existent',id:1},
        {texte:"Demande d'offre ",icon:Icon({pathIcon:"demande"}),description:"Demande d'offre des départements",id:2}
    ]


  
    
  
    const headerElement = [
      {texte:'Département',id:1},
      {texte:'Ajout',id:0}
    ]

    const[numPage,setNumP] = useState(-1)
    const[choixService,setChoixService] = useState('null')
    if(foncLogin==2){
      return < Navigate to="/Back_office/Login"/>
    }
  return <>
    <div className='dash-board-container'>
        <Side_bar setLog={setLog} items={dataSideBar} setNumP={setNumP} funcService={setChoixService} foncSetLogin={foncSetLogin}/>
        
        
        <ContentBackOffice items={contentService} items_annonce={dataDemande} headerElement={headerElement} items_service={listeServices} numPage={numPage} setNumP={setNumP} choixService={choixService} setChoixService={setChoixService}/>
    </div>
  </>
}

export default HomeBackOffice