import React from 'react'
 

function Fetch() {
  const apiGet = ()=>{
    fetch("http://localhost:3202/getAllDepartement")
    .then((response)=> response.json())
    .then((json)=> console.log(json))
    .catch((error)=> console.error('Error:',error));
  }
  return <>
    <div>Fetch api</div>
    <button onClick={apiGet}>Ok</button>
  </>
}


export default Fetch