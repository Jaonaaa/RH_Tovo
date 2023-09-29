import React from 'react'
import './../css/cv_content.css'
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

function InputPerso({type,name,classN,labelTexte}){
 return <>
   <div className='box-input'>
    <div className='label-texte'>{labelTexte}</div>
    <input className={classN} type={type} name={name} />
  </div>
 </>
}
function ButtonPerso({texte,classN}) {
  return <>
  <div className='button-container'>
    <button className={classN}>{texte}</button>
  </div>
    
  </>
}
function SelectPerso({tabData,labelTexte}) {
  return <>
  <div className='box-select'>
    <div className='label-texte'>{labelTexte}</div>
    <select name="" id="">
        {tabData.map(data=>
          <option value={data.value}>{data.texte}</option>
        )}
      </select>
  </div>
    
  </>
}
function Cv_content() {
const dataSelect = [
  {texte:'Malagasy',value:'1'},
  {texte:'Français',value:'2'},
  {texte:'Japonais',value:'3'}
]
  return <> 
  <div className='cv_container'>
    <InputPerso type={"text"} name={"nom"} classN={"inputNom"} labelTexte={"Nom"}/>
    <InputPerso type={"text"} name={"prenom"} classN={"inputPrenom"} labelTexte={"Prenom"}/>
    <InputPerso type={"date"} name={"dtn"} classN={"inputDtn"} labelTexte={"Date de naissance"}/>
    <InputPerso type={"text"} name={"adresse"} classN={"inputAdresse"} labelTexte={"Adresse"}/>
    <SelectPerso tabData={dataSelect} labelTexte={"Nationalité"} />
    
    <ButtonPerso texte={"Suivant"} classN={"btn-perso"}/>
  </div>
    
  </>
}

export default Cv_content