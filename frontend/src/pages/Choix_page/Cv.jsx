import React from 'react'
import Nav_bar from '../../Composant/jsx/nav_bar'
import Cv_content from '../../Composant/jsx/cv_content'
function Cv() {
  return <>
    <div className='box-all-client'>
      <Nav_bar search_bar={true}/>
    </div>
    <Cv_content/>
  </>
}

export default Cv