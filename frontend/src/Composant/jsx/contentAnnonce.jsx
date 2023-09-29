import React from 'react'
import './../css/contentAnnonce.css'
function BlocTexte() {
    return <>
        <div className='bloc_texte'>
            <div className='titre_bloc'>Minimum recquis</div>
            <div className='description_poste'>
                Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Maxime aliquam provident eos cum corporis 
                delectus nisi, laudantium ipsam officiis numquam.Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Maxime aliquam provident eos cum corporis 
                delectus nisi, laudantium ipsam officiis numquam.
                Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Maxime aliquam provident eos cum corporis 
                delectus nisi, laudantium ipsam officiis numquam.Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Maxime aliquam provident eos cum corporis 
                delectus nisi, laudantium ipsam officiis numquam.
            </div>
        </div>
    </>
}
function BlocMission() {
    return <>
        <ul className='box-mission'>
            <div className='titre-mission'>Experience</div>
            <li className='mission-content'>mission1</li>
            <li className='mission-content'>mission1</li>
        </ul>
    </>
}

function ContentAnnonce({dataAnnonce}) {
  return <>
    <div className='box-content-annonce'>
        
        <BlocTexte /> {/* description du poste */}
        <BlocMission /> {/* Mission principal */}
        <BlocTexte /> {/* description du poste */}
        <BlocMission /> {/* Minimum recquis */}
        <BlocTexte /> {/* description du poste */}
        <BlocMission /> {/*  */}
    </div>
  </>
}

export default ContentAnnonce

