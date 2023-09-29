import React from 'react'
import { Nav_bar } from "./../../Composant/jsx/nav_bar";
import  Card  from "./../../Composant/jsx/card";
import {ContentInfo1,ContentInfo2} from "./../../Composant/jsx/content_information"



function HomeClient() {

  

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
        {datas.map((data)=>
          <Card poste={data.poste} departement={data.departement} description={data.description} />
        )}  
    </div>

    <div className='box-departement-info'>
          <ContentInfo2/>
    </div>
  </>
  
}

export default HomeClient