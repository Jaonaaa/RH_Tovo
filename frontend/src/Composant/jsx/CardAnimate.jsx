import React, { useState } from 'react';
import './../css/CardAnimate.css'
import Icon from '../../Icon';


function CardAnimate({data}) {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(data);
    
    const handleHover = () => {
      setIsFlipped(!isFlipped);
    };
   

  return <>
  

    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleHover}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className='header'>
            <img src={Icon({pathIcon:'logo'})} alt="logo" />
            <div className='bloc_texte_header'>
              <div className='bloc_poste_'>{data.details.poste}</div>
              <div className='bloc_departement_'>{data.departement.nom}</div>
            </div>
          </div>
          <div className='bloc_description'>
            <div className='titre'>Déscription</div>
            <div className='texte'>
              {data.details.taches}
            </div>
          </div>

        </div>
        
        <div className="card-back">
          <div className='back-element'>
            <div className='titre_'>Homme/jour</div>
            <div className='texte'>{data.details.vol_hommme_jour}</div>
          </div>
          
          <div className='back-element'>
            <div className='titre_'>Horaire</div>
            <div className='texte'>{data.details.vol_horaire}</div>
          </div>

          <div className='back-element'>
            <div className='titre_'>Tâche</div>
            <div className='texte'>{data.details.vol_tache}</div>
          </div>

        </div>
      </div>
    </div>

    


  
    
  </>
}

export default CardAnimate;
