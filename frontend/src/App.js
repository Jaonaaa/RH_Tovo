
import './App.css';
import './assets/css/index.css';
import Fetch from './Fetch';
import Login from './pages/Choix_page/Login';
import Annonce from './pages/Choix_page/Annonce';
import Cv from './pages/Choix_page/Cv';

import  HomeClient  from "./pages/Choix_page/HomeClient";
import HomePage from "./pages/Choix_page/HomePage";

import HomeBackOffice from './pages/Choix_page/Back__office/HomeBackOffice';
import HomeDepartement from './pages/Choix_page/Back__office/HomeDepartement';

import { Routes, Route, Link} from "react-router-dom";
import CardAnimate from './Composant/jsx/CardAnimate';
import Footer from './Footer';
import { Entretien,EntretienAffichage } from './Composant/jsx/Entretien';
import AnnonceForm from './Composant/Form P/AnnonceForm/AnnonceForm';
import { useState } from 'react';


function App() {
  const [log,setLog] = useState(-1)
  const [login,setLogin] = useState(-1);
  return (

    <>
    {/* <AnnonceForm/> */}
    {/* <Footer/> */}
    {/* <CardAnimate/> */}
    {/* <Fetch/> */}
  <Routes>
    <Route path="/" element={<HomePage/>}/>

    <Route path="/Back_office">
      <Route path='Login' element={<Login log={log} setLog={setLog} foncSetLogin={setLogin}/>}/>
      <Route path='HomeDepartment' element={<HomeDepartement setLog={setLog} foncLogin={login} foncSetLogin={setLogin} />}/>
      <Route path='HomeBackOffice' element={<HomeBackOffice setLog={setLog} foncLogin={login} foncSetLogin={setLogin} />}/>
    </Route>

    <Route path="/Client" >
      <Route path="HomeClient" element={<HomeClient/>}/>
      <Route path="Cv" element={<Cv/>}/>
      <Route path="EntretienAffichage" element={<EntretienAffichage/>}/>
      <Route path="Annonce" element={<Annonce/>}/>
    </Route>
    
    <Route path="HomeClient" element={<HomeClient/>}/>
    <Route path="Annonce" element={<Annonce/>}/>
    <Route path="/Cv" element={<Cv/>}/>
    <Route path="/EntretienAffichage" element={<EntretienAffichage/>}/>


    


    
  </Routes>
    </>
  )
}

export default App;
