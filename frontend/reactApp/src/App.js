
import './App.css';
import './assets/css/index.css';
import Annonce from './pages/Choix_page/Annonce';
import Cv from './pages/Choix_page/Cv';

import  HomeClient  from "./pages/Choix_page/HomeClient";
import HomePage from "./pages/Choix_page/HomePage";

import { Routes, Route, Link} from "react-router-dom";


function App() {
  console.log("ff");
  return (

    <>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Back_office" />

    <Route path="/Client" >
    <Route path="HomeClient" element={<HomeClient/>}/>
    <Route path="Cv" element={<Cv/>}/>
      
    </Route>
    
    <Route path="HomeClient" element={<HomeClient/>}/>
    <Route path="Annonce" element={<Annonce/>}/>
    <Route path="/Cv" element={<Cv/>}/>
    
    <Route path="/Entretien" element={""}/>
  </Routes>
    </>
  )
}

export default App;
