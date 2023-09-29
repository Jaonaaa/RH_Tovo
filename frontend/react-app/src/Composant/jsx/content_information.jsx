import React from 'react'
import  Search  from "./../../assets/img/Search.gif";
import  Organize  from "./../../assets/img/Organize.gif";
import "./../css/ContentInfo.css"
import  Fleche  from "./../../assets/img/fleche.png";


export function ContentInfo1() {
    const allDep = ['Juridique','IT','Marketing','Ressource humaine','Juridique','IT','Marketing','Ressource humaine','Juridique','IT','Marketing','Ressource humaine','Juridique','IT','Marketing','Ressource humaine']
  return <>
  <img src={Search} alt="need job" />
    <div className='left-content'>
        <div className='texte-content'>
            <div className='part'>Trouvez du travail dans</div>
            <div className='part'>nos différent département</div>
        </div>
        
    </div>
    <div className='right-content'>
        <div className='box-all-dep'>
            {allDep.map(dep=>
                <div className='dep'>{dep}</div>
            )}
        </div>
    </div>
  </>
}

export function ContentInfo2() {
    return <>
    

    
    <div className='left-content2'>
            <div className='texte-content'>
                <div className='part'>Venez voir le calendrier des entretiens</div>
                <div className='part'> </div>
            </div>
            <div className='right-content2'>
            <div className='btn_organize'>
                <div className='texte_btn'>VOIR</div>
            </div>
        </div>
    </div>
    <img src={Organize} alt="organize" />

    </>
}




