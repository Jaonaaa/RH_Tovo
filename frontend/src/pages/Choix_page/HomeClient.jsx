import React, { useEffect } from 'react'
import { Nav_bar } from "./../../Composant/jsx/nav_bar";
import  {Card,Card1}  from "./../../Composant/jsx/card";
import {ContentInfo1,ContentInfo2} from "./../../Composant/jsx/content_information"
import { Fetch } from '../../Fetch';
import { useState } from 'react';


function HomeClient() {
  const allDemande = Fetch({path:"/getRequestAllDepartement",method:"POST"})
    
    const [dataDemande,setDataDemande] = useState(allDemande)
    
    useEffect(()=>{
      // data demande service
      allDemande.then((dataDS)=>{
          setDataDemande(dataDS.data)
          // console.log(dataDS.data);
      })

      
     
     
    },[])
  
  
  const datas = [
    {poste:'Testeur',departement:'Finance',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
    {poste:'Infirmier en chef',departement:'Santé',description:'Nous cherchons un infifirmier en chef'},
    {poste:'Dev senior',departement:'Mobile',description:'Nous cherchons un dev senior pour la création de mobile Application'},
    {poste:'Testeur',departement:'Finance',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
    {poste:'Infirmier en chef',departement:'Santé',description:'Nous cherchons un infifirmier en chef'},
    {poste:'Dev senior',departement:'Mobile',description:'Nous cherchons un dev senior pour la création de mobile Application'}
  ]
  
  return <>
    <div className='box-all-client'>
      <Nav_bar search_bar={true}/>
    </div>
    <div className='box-departement-info'>
          <ContentInfo1/>
    </div>

    <div className='titre'>Annonces</div>

    <div className='box-all-content'>
    {/* {console.log(dataDemande)} */}

   {/* {console.log(Array.isArray(dataDemande))} */}


      {datas.map((element,index) => 

          <Card1 key={index}  poste={element.poste} departement={element.departement} description={element.description} />
      )}
         
    </div>

    <div className='box-departement-info'>
          <ContentInfo2/>
    </div>
  </>
  
}

export default HomeClient