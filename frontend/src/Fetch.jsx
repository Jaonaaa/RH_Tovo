import React from 'react'
import { json } from 'react-router-dom';
 

export async function Fetch({path,method}) {
  let data = []
  const apiGet = await fetch(`http://localhost:3202${path}`,{
    method:method
  })
    .then((response)=> response.json())
    .then((json)=> data=json)
    .catch((error)=> console.error('Error:',error));
  return data
}

export async function Fetch2({path,idD}) {
  let data = []
  const formDataObject = new FormData();
  formDataObject.append('idDepartement', JSON.stringify(idD));

  const apiGet = await fetch(`http://localhost:3202${path}`,{
    method: 'POST',
    body: formDataObject,
  })
    .then((response)=> response.json())
    .then((json)=> data=json)
    .catch((error)=> console.error('Error:',error));
  return data
}
