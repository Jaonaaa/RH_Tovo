import React from 'react'
import Logo from './../../assets/img/Logo.svg'
import Share from './../../assets/img/partager.png'
import "./../../assets/fontawesome-5/css/all.min.css";
import "./../css/headerAnnonce.css";
import Cv from '../../pages/Choix_page/Cv';
import { Link } from 'react-router-dom';

function headerAnnonce({dataAnnonce}) {
    const css = {
        color:'white'
    }
  return <>
    <div className='box-container-header-annonce'>
        <div className='head-logo'>
            <img src={Logo} alt="" />
        </div>

        <div className='content-header-annonce'>
            <div className='header-poste'>{dataAnnonce[1].poste}</div>
            <div className='header-nomEntreprise'>Gasy Tia Informatika</div>
            <div className='box-bouton-header'>
            <Link to={"/Cv"} style={css}>
                <div className='btn-postuler'>
                    <div className='btn-text'>Postuler</div>
                    <img src={Share} alt="partger icon" />
                </div>
            </Link>
            </div>
        </div>


    </div>
  </>
}

export default headerAnnonce