import React from 'react'
import './../css/footerAnnonce.css'

function FooterAnnonce({dataAnnonce}) {
  return <>
    <div className='box-footer-annonce'>
        <div className="footer-annonce-content">
            <div className='titre-footer'>Volume horaire</div>
            <div className='content-footer'>Temps plein</div>
        </div>

        <div className="footer-annonce-content">
            <div className='titre-footer'>Nombre de personne</div>
            <div className='content-footer'>5</div>
        </div>

        <div className="footer-annonce-content">
            <div className='titre-footer'>Département</div>
            <div className='content-footer'>Santé</div>
        </div>

        <div className="footer-annonce-content">
            <div className='titre-footer'>Fonction</div>
            <div className='content-footer'>Front-end</div>
        </div>
        
    </div>
  </>
}

export default FooterAnnonce