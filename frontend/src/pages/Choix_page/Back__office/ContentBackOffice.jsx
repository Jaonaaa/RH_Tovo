import React, { useState } from 'react'
import {Content_card,Card_Service} from '../../../Composant/jsx/composant_BackOffice/content_card'
import Filtre from '../../../Composant/jsx/Filtre'
import { Card1 } from '../../../Composant/jsx/card'
import {InputPerso,ButtonPerso,SelectPerso,TextAreaPerso} from './../../../Composant/jsx/cv_content'
import { useEffect } from 'react'
function AjoutService() {
  return <>
    <form className='from_ajout_service' action="" method=''>
      <InputPerso type={"texte"} name={"nomService"} classN={"inputNomService"} labelTexte={"Département"}/>
      <ButtonPerso texte={"Valider"} classN={"btn-perso"} func={""}/>
    </form>
  </>
}
function DemandeOffre({idDep}) {
  return <>
    <form className='from_demande_offre' action="" method=''>
      <InputPerso type={"texte"} name={"poste"} classN={"inputPost"} labelTexte={"Poste"}/>
      <InputPerso type={"number"} name={"volumeHoraire"} classN={"inputVolumeHoraire"} labelTexte={"Volume horaire"}/>
      <InputPerso type={"number"} name={"hommeJour"} classN={"inputHommeJour"} labelTexte={"Volume hommme/jour"}/>
      <TextAreaPerso labelTexte={"Tache(s)"}/>
      <InputPerso type={"hidden"} name={"idDep"} classN={"idDep"}  value={Math.abs(idDep)}/>
      <ButtonPerso texte={"Valider"} classN={"btn-perso"} func={""}/>
    </form>
  </>
}
function filtreD(datas,category) {
  if (category==='Tous') {
    return datas;
  }else{
    let tabData = datas.filter((data)=>data.departement===category)
    return tabData
  }
}
function Departement1({items,setNumP}) {
  return <>
    <Content_card items={items} setNumP={setNumP}/>
  </>
}
function Annonce1({items,setNumP,dataAnnonce}) {
  const [category,setCategory] = useState('Tous')
  const [cardData,setCardData] = useState(dataAnnonce)

  useEffect(()=>{
    let tabDonne = filtreD(dataAnnonce,category)
    setCardData(tabDonne)
  },[category])

  return <>
    <Filtre id={1} tabs={items} setCategory={setCategory}/>
    {cardData.map(data=>
      data.departement=='Tous'?'':<Card1 poste={data.poste} departement={data.departement} description={data.description}/>
    )}
    
  </>
}



function ChangePage({num,setNumP,items,items_annonce,items_service,choixService,setChoixService}){
  //miditra anaty departement
  if(num>-1&&choixService===items_service[num].departement){
    console.log(num);
    return<>
      <DemandeOffre idDep={num}/>
    </>
  }

  if(num==-1){
    return <>
    <Departement1 items={items} setNumP={setNumP}/>
  </>
  }else if(num==0){
    
    return <>
      <AjoutService/>
    </>
  }else if(num==1){
    
    return <>
      <Card_Service items={items_service} setNumP={setNumP} setChoixService={setChoixService}/>
    </>
  }else if(num==2){
   
    return <>
      <Annonce1 items={items_service} dataAnnonce={items_annonce}/>
    </>
  }else if(num==3){
   
    return <>
      <Annonce1 items={items_service} dataAnnonce={items_annonce}/>
    </>
  }
  
  
}
function ContentBackOffice({items,headerElement,items_service,items_annonce,numPage,setNumP,choixService,setChoixService}) {
  
  return <>
  <div className='box-backOffice'>
    <div className='container-header'>
         {headerElement.map(item=>
        
            <div className='header-element'>
             <div className='header-content'>{item.texte}</div>
             {item.length>1?'':<i className='fas fa-chevron-right'></i>}
           </div>
           
          )}
    </div>
    <div className='container-contentBackOffice'>
      <ChangePage num={numPage} items={items} setNumP={setNumP} items_annonce={items_annonce} items_service={items_service} choixService={choixService} setChoixService={setChoixService} />
    </div>
  </div>
    
  </>
}

export default ContentBackOffice