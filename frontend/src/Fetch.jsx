import React from 'react'
import { json } from 'react-router-dom';
 

 async function Fetch({path}) {
  let data = []
  const apiGet = await fetch(`http://localhost:3202${path}`)
    .then((response)=> response.json())
    .then((json)=> data=json)
    .catch((error)=> console.error('Error:',error));
  return data
}


export default Fetch