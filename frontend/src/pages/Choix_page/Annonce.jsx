import React, { useEffect, useState } from 'react'
import { Nav_bar } from "./../../Composant/jsx/nav_bar";
import  Card  from "./../../Composant/jsx/card";
import Filtre from "../../Composant/jsx/Filtre";
import HeaderAnnonce from '../../Composant/jsx/headerAnnonce';
import ContentAnnonce from '../../Composant/jsx/contentAnnonce';
import FooterAnnonce from '../../Composant/jsx/footerAnnonce';
function filtreD(datas,category) {
  if (category==='Tous') {
    return datas;
  }else{
    let tabData = datas.filter((data)=>data.departement===category)
    return tabData
  }
}
function Annonce() {
  const [category,setCategory] = useState('Tous')

    const datas = [
        {departement:'Tous'},
        {poste:'Testeur',departement:'Finance',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
        {poste:'Infirmier en chef',departement:'Santé',description:'Nous cherchons un infifirmier en chef'},
        {poste:'Dev senior',departement:'Mobile',description:'Nous cherchons un dev senior pour la création de mobile Application'},
        {poste:'Testeur',departement:'Finance',description:'Nous cherchons un testeur pour un projet de gestion de la finance'},
        {poste:'Infirmier en chef',departement:'Santé',description:'Nous cherchons un infifirmier en chef'},
        {poste:'Dev senior',departement:'Mobile',description:'Nous cherchons un dev senior pour la création de mobile Application'}
      ]

    const [cardData,setCardData] = useState(datas)

    useEffect(()=>{
      let tabDonne = filtreD(datas,category)
      setCardData(tabDonne)
    },[category])

    const [idAnnonce,setID] = useState(-1)

    useEffect(()=>{
      console.log(idAnnonce);
    },[idAnnonce])

    const [dataHeader,setDataHeader] = useState(datas)
    const [dataContent,setDataContent] = useState(datas)
    const [dataFooter,setDataFooter] = useState(datas)



  return <>
    <div className='box-all-client'>
      <Nav_bar search_bar={true}/>
    </div>
    <Filtre id={1} tabs={datas} setCategory={setCategory}/>

    <div className='box-offer'>

        <div className='listOffer'>
            {cardData.map((donnee,key)=>
              donnee.departement=='Tous'?'':<Card id={key} setAnnonce={setID} poste={donnee.poste} departement={donnee.departement} description={donnee.description} />
            )} 
      </div>

        <div className='detailOffer'>
          <HeaderAnnonce dataAnnonce={dataHeader}/>
          <ContentAnnonce dataAnnonce={dataContent}/>
          <FooterAnnonce dataAnnonce={dataFooter}/>
        </div>

    </div>
  </>
}

export default Annonce