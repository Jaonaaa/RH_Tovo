import React from 'react'
import Stat from './assets/img/stat.svg'
import Service from './assets/img/service.svg'


import Ajout from './assets/img/ajout.svg'
import Liste from './assets/img/liste.svg'
import Annonce from './assets/img/annonce.svg'
import Demande from './assets/img/demande.svg'


import Juridique from './assets/img/juridique.svg'
import It from './assets/img/it.svg'
import Marketing from './assets/img/marketing.svg'
import Rh from './assets/img/humain.svg'
import Logo from './assets/img/Logo.svg'

function Icon({pathIcon}) {
  if("stat"===pathIcon){
    return Stat
  }else if("ajout"===pathIcon){
    return Ajout
  }else if("liste"===pathIcon){
    return Liste
  }else if("annonce"===pathIcon){
    return Annonce
  }else if("demande"===pathIcon){
    return Demande
  }else if("juridique"===pathIcon){
    return Juridique
  }else if("it"===pathIcon){
    return It
  }else if("marketing"===pathIcon){
    return Marketing
  }else if("service"===pathIcon){
    return Service
  }else if("humain"===pathIcon){
    return Rh
  }else if("logo"===pathIcon){
    return Logo
  }
}

export default Icon