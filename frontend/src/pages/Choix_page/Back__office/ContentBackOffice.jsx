import React, { useState } from 'react'
import {Content_card,Card_Service} from '../../../Composant/jsx/composant_BackOffice/content_card'
import Filtre from '../../../Composant/jsx/Filtre'
import { Card1 } from '../../../Composant/jsx/card'
import {InputPerso,ButtonPerso,SelectPerso,TextAreaPerso} from './../../../Composant/jsx/cv_content'
import { useEffect } from 'react'
import CardAnimate from '../../../Composant/jsx/CardAnimate'
import { Entretien } from '../../../Composant/jsx/Entretien'

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
    departement_description:'',
    departement_icon:'',
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
    formDataObject.append('departement_description', formData.departement_description);
    formDataObject.append('departement_icon', formData.departement_icon);

    

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
      <InputPerso fonction={handleChange} type={"texte"} name={"name"} classN={"inputNomService"} labelTexte={"Département"} value={formData.name}/>
      <InputPerso fonction={handleChange} type={"texte"} name={"departement_description"} classN={"inputDescription"} labelTexte={"Déscription"} value={formData.departement_description}/>
      <InputPerso fonction={handleChange} type={"texte"} name={"departement_icon"} classN={"inputIcon"} labelTexte={"Icon"} value={formData.departement_icon}/>
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
        window.location.reload(false);
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
    let tabData = datas.filter((data)=>data.nom===category)
    return tabData
  }
}
function Departement1({items,setNumP}) {
  return <>
    <Content_card items={items} setNumP={setNumP}/>
  </>
}

function Annonce1({items,setNumP,dataAnnonce}) {
  // console.log(dataAnnonce);
  const [category,setCategory] = useState('Tous')
  const [cardData,setCardData] = useState(dataAnnonce)

  useEffect(()=>{
    let tabDonne = filtreD(dataAnnonce,category)
    setCardData(tabDonne)
  },[category])

  return <>
    <Filtre id={1} tabs={items} setCategory={setCategory}/>
    {cardData.map((data,index)=>
     
      data.nom=='Tous'?'':<Card1 idDemande={data.details.id} key={index} poste={data.details.poste} departement={data.departement.nom} description={data.details.taches}/>
      
    )}
    
  </>
}



function ChangePage({num,setNumP,items,items_annonce,items_service,choixService,setChoixService}){
  //aminzay mandeha tsara lay passage entre en composant
  //hatreto lony fa mila ovaina
  
  if(num>-1&&choixService===items_service[num].nom){
    return <>
      <Card_Service items={items_service} setNumP={setNumP} setChoixService={setChoixService}/>
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
  }else if(num==4){
    return <>
      <Entretien/>
    </>
  }
  
  
}
export function ContentBackOffice({items,headerElement,items_service,items_annonce,numPage,setNumP,choixService,setChoixService}) {
  
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
function ChangePageDep({numPage,dataDemande,idD}) {
  if(numPage===-1){
    return <>
      <DemandeOffre idD={idD}/>
    </>
  }else if(numPage===1){
    return <>
    <div className='boxT'>
      
      {dataDemande.map((data,index)=>
          <CardAnimate key={index} data={data}/>
      )}

    </div>
      
    </>
  }
}

export function ContentDepartement({headerElement,numPage,dataDemande,idD}) {
  
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
        <ChangePageDep numPage={numPage} dataDemande={dataDemande} idD={idD}/>
    </div>
  </div>
    
  </>
}

