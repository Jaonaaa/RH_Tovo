import React, { useState } from 'react';
import './../css/CardAnimate.css'
import Icon from '../../Icon';


function CardAnimate() {
    const [isFlipped, setIsFlipped] = useState(false);

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
              <div className='bloc_poste_'>Testeur</div>
              <div className='bloc_departement_'>IT</div>
            </div>
          </div>
          <div className='bloc_description'>
            <div className='titre'>Déscription</div>
            <div className='texte'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Asperiores quam accusamus sed magni minus culpa obcaecati 
              esse officia accusantium excepturi.
            </div>
          </div>

        </div>
        
        <div className="card-back">
          <div className='back-element'>
            <div className='titre_'>Homme/jour</div>
            <div className='texte'>5</div>
          </div>
          
          <div className='back-element'>
            <div className='titre_'>Horaire</div>
            <div className='texte'>5</div>
          </div>

          <div className='back-element'>
            <div className='titre_'>Tâche</div>
            <div className='texte'>5</div>
          </div>

        </div>
      </div>
    </div>

    


  
    
  </>
}

export default CardAnimate;
