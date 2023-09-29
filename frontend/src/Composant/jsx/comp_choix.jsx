import './../css/Choix.css';
import {ReactComponent as ReactLogo2} from './../../assets/img/choix2.svg';
import {ReactComponent as ReactLogo1} from './../../assets/img/choix1.svg';



export function Choix({titre,description,svg}) {
   
    return<>
        <div className="box">
            <div className='box-component'>
                {svg?<ReactLogo1 className='svg'/>:<ReactLogo2 className='svg'/>}
                <div className="descri-titre">{titre}</div>
            </div>
            <div className="box-descri">
                <div className="decri-content">{description}</div>
            </div>
        </div>
    </>
}
