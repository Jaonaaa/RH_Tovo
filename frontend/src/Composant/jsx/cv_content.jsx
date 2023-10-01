import React from 'react'
import './../css/cv_content.css'
import { useState } from 'react'
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

export function InputPerso({type,name,classN,labelTexte}){
 return <>
   <div className='box-input'>
    <div className='label-texte'>{labelTexte}</div>
    
    <input className={classN} type={type} name={name} />
  </div>
 </>
}
export function ButtonPerso({texte,classN,func}) {
  return <>
  <div className='button-container'>
    <button className={classN} onClick={func}>{texte}</button>
  </div>
    
  </>
}
export function SelectPerso({tabData,labelTexte}) {
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

export function TextAreaPerso({labelTexte}) {
  return <>
    <div className='box-textArea'>
        <div className='label-texte'>{labelTexte}</div>
        <textarea name="" id="" cols="30" rows="5"></textarea>
    </div>
  </>
}

function EtudePerso({labelTexte}) {
  return <>
    <div className='box-etudePerso'>
      <div className='label-texte'>{labelTexte}</div>

      <div className='box-content-etude'>
        <input id='inputE' type="text" name="nomEtudePerso" placeholder='Bacc,Certification,...' />
        <div className='box-niveau'>
          <label htmlFor="niveauE">+</label>
          <input type="number" name="niveau" id='niveauE'/>
        </div>
      </div>

    </div>
  </>
}


function Part_cv_1({func}) {
  const dataSelect = [
    {texte:'Malagasy',value:'1'},
    {texte:'Français',value:'2'},
    {texte:'Japonais',value:'3'}
  ]
  const dataSex = [
    {texte:'Homme',value:'1'},
    {texte:'Femme',value:'2'}
  ]
  
  return <>
    <div className='part1'>
      <InputPerso type={"text"} name={"nom"} classN={"inputNom"} labelTexte={"Nom"}/>
      <InputPerso type={"text"} name={"prenom"} classN={"inputPrenom"} labelTexte={"Prenom"}/>
      <InputPerso type={"date"} name={"dtn"} classN={"inputDtn"} labelTexte={"Date de naissance"}/>
      <SelectPerso tabData={dataSex} labelTexte={"Sexe"} />
      <SelectPerso tabData={dataSelect} labelTexte={"Nationalité"} />
      
      <ButtonPerso texte={"Suivant"} classN={"btn-perso"} func={func}/>
    </div>
    
  </>
}

function Part_cv_2() {
  const dataSituationMatrimonial = [
    {texte:'Marié(e)',value:'1'},
    {texte:'Célibataire',value:'2'},
    {texte:'Veuf(ve)',value:'3'}
  ]
  
  
  return <>
  <div className='part2'>
      <InputPerso type={"text"} name={"adresse"} classN={"inputAdresse"} labelTexte={"Adresse"}/>
      <SelectPerso tabData={dataSituationMatrimonial} labelTexte={"Situation matrimoniale"} />
      <EtudePerso labelTexte={"Education"}/>
      <TextAreaPerso labelTexte={"Extra"}/>
      <ImportFile/>
  
      <ButtonPerso texte={"Valider"} classN={"btn-perso"}/>
  </div>
    
  </>
}


function ImportFile() {

  const[animation,setAnimation] = useState('')

    function animate() {
      if(animation=='active'){
        setAnimation('')
      }else{
        setAnimation('active')
      }
      setTimeout(() => {
				setAnimation('')
			}, 9000);
      
    }

    return <>

    <label className='label' htmlFor="download_input">
        <div className={`btn ${animation}`} >
            <div class="completed">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="download">
              <i class="fas fa-download"></i>
            </div>
        </div> 
          
        
    </label>

    <input type="file" name="download_input" id="download_input" onChange={animate} />
    </>
}
function Cv_content() {
  const[changePage,setChangeP] = useState(1)
  const handleChange = ()=>{
    setChangeP(2)
  }
  return <> 
    <div className='cv_container'>
      <form action="" method=''>
        {changePage===1?<Part_cv_1 func={handleChange}/>:<Part_cv_2/>}
      </form>
    </div>
  </>
}

export default Cv_content