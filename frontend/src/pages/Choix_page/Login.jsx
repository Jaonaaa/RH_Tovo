import React from "react";
import "./../../assets/css/Login.css";
import { InputPerso, ButtonPerso } from "../../Composant/jsx/cv_content";
import Log from "./../../assets/img/log.jpg";
import Logo from "./../../assets/img/Logo.svg";
import { useState } from "react";
import HomeDepartement from "./Back__office/HomeDepartement";
import HomeBackOffice from "./Back__office/HomeBackOffice";
function checkLogin({ data, setLog }) {
  if (data.nom === "Sergio") {
    setLog(0);
  } else if (data.nom === "Paul") {
    setLog(1);
  } else {
    setLog(2);
  }
}
function Login() {
  const [log, setLog] = useState(-1);
  const [formData, setFormData] = useState({
    nom: "",
    mdp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formDataObject = new FormData();

    // formDataObject.append('departement_name', formData.name);
    // formDataObject.append('departement_description', formData.departement_description);
    // formDataObject.append('departement_icon', formData.departement_icon);

    // fetch('http://localhost:3202/addNewDepartement', {
    //   method: 'POST',
    //   body: formDataObject,
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    checkLogin({ data: formData, setLog: setLog });
  };

  return (
    <>
      {log === 0 ? (
        <HomeDepartement />
      ) : log === 1 ? (
        <HomeBackOffice />
      ) : (
        <div className="login-container">
          <div className="left">
            <div className="">
              <img src={Logo} alt="" />
            </div>
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="bloc-texte">
                <div className="_1">Welcome back</div>
                <div className="_2">Welcome back please enter your details</div>
              </div>
              <InputPerso
                fonction={handleChange}
                type={"text"}
                classN={"inputLoginNom"}
                couleurLabel={"loginLabelInput"}
                name={"nom"}
                labelTexte={"Nom"}
              />
              <InputPerso
                fonction={handleChange}
                type={"password"}
                classN={"inputLoginMdp"}
                couleurLabel={"loginLabelInput"}
                name={"mdp"}
                labelTexte={"Password"}
              />
              <ButtonPerso
                type={"submit"}
                texte={"Sign in"}
                classN={"btn-perso"}
                container_class={"container-btn"}
              />
            </form>
          </div>

          <div className="right">
            <img src={Log} alt="" />
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
