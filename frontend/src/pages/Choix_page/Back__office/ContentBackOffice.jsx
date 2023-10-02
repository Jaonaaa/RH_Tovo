import React, { useState } from 'react'
import {Content_card,Card_Service} from '../../../Composant/jsx/composant_BackOffice/content_card'
import Filtre from '../../../Composant/jsx/Filtre'
import { Card1 } from '../../../Composant/jsx/card'
import {InputPerso,ButtonPerso,SelectPerso,TextAreaPerso} from './../../../Composant/jsx/cv_content'
import { useEffect } from 'react'

/*
  +label(titre)
  +coeff
  +question reponse{
      type input
      reponse [
        label:'',
        correct : boolean
      ]
  }
*/



function AjoutService() {
  const [formData, setFormData] = useState({
    name: '',
    
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const formDataObject = new FormData();

    formDataObject.append('departement_name', formData.name);

    

    fetch('http://localhost:3202/addNewDepartement', {
      method: 'POST',
      body: formDataObject,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };




  return <>
    <form className='from_ajout_service'  onSubmit={handleSubmit}>
      <InputPerso fonction={handleChange} type={"texte"} name={"name"} classN={"inputNomService"} labelTexte={"Département"} value={formData.nomService}/>
      <ButtonPerso type={"submit"} texte={"Valider"} classN={"btn-perso"} />
    </form>
  </>
}





function DemandeOffre({idD}) {
  let idDep = Math.abs(idD)
  const [formData, setFormData] = useState({
    vol_tache: '',
    vol_horaire:'',
    vol_homme_jour:'',
    taches:'',
    poste:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const formDataObject = new FormData();

    let data = {
      requete_d:{id_departement:idDep},
      details_req:formData
    }

    
    formDataObject.append('data', JSON.stringify(data));


    

    fetch('http://localhost:3202/registerRequestDepartement', {
      method: 'POST',
      body: formDataObject,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };


  return <>
    <form className='from_demande_offre' onSubmit={handleSubmit}>
      <InputPerso fonction={handleChange} type={"texte"} name={"poste"} classN={"inputPost"} labelTexte={"Poste"} value={formData.poste}/>
      <InputPerso fonction={handleChange} type={"number"} name={"vol_horaire"} classN={"inputVolumeHoraire"} labelTexte={"Volume horaire"} value={formData.vol_horaire}/>
      <InputPerso fonction={handleChange} type={"number"} name={"vol_homme_jour"} classN={"inputHommeJour"} labelTexte={"Volume hommme/jour"} value={formData.vol_homme_jour}/>
      <InputPerso fonction={handleChange} type={"number"} name={"vol_tache"} classN={"inputVolTache"} labelTexte={"Volume tache"} value={formData.vol_tache}/>
      <TextAreaPerso fonction={handleChange} name={'taches'} labelTexte={"Tache(s)"} value={formData.taches}/>
      <ButtonPerso type={"submit"} texte={"Valider"} classN={"btn-perso"} />
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
    {cardData.map((data,index)=>
      data.departement=='Tous'?'':<Card1 key={index} poste={data.poste} departement={data.departement} description={data.description}/>
    )}
    
  </>
}



function ChangePage({num,setNumP,items,items_annonce,items_service,choixService,setChoixService}){
  //miditra anaty departement
  if(num>-1&&choixService===items_service[num].departement){
    console.log(num);
    return<>
      <DemandeOffre idD={num}/>
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
         {headerElement.map((item,index)=>
        
            <div key={index} className='header-element'>
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