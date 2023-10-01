
import './App.css';
import './assets/css/index.css';
import Fetch from './Fetch';
import Annonce from './pages/Choix_page/Annonce';
import Cv from './pages/Choix_page/Cv';

import  HomeClient  from "./pages/Choix_page/HomeClient";
import HomePage from "./pages/Choix_page/HomePage";

import HomeBackOffice from "./pages/Choix_page/Back__office/HomeBackOffice";

import { Routes, Route, Link} from "react-router-dom";


function App() {
  
  return (

    <>
    {/* <Fetch/> */}
  <Routes>
    <Route path="/" element={<HomePage/>}/>

    <Route path="/Back_office">
      <Route path='HomeBackOffice' element={<HomeBackOffice/>}/>
    </Route>

    <Route path="/Client" >
      <Route path="HomeClient" element={<HomeClient/>}/>
      <Route path="Cv" element={<Cv/>}/>
    </Route>
    
    <Route path="HomeClient" element={<HomeClient/>}/>
    <Route path="Annonce" element={<Annonce/>}/>
    <Route path="/Cv" element={<Cv/>}/>

    <Route path='/HomeBackOffice' element={<HomeBackOffice/>}/>
    
    <Route path="/Entretien" element={""}/>
  </Routes>
    </>
  )
}

export default App;
