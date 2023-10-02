import React, { useState } from 'react';

function Formulaire() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
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

    // Créez une instance de FormData
    const formDataObject = new FormData();

    // Ajoutez les champs du formulaire à FormData
    formDataObject.append('nom', formData.nom);
    formDataObject.append('email', formData.email);
    formDataObject.append('message', formData.message);

    // Vous pouvez maintenant envoyer formDataObject à votre backend
    // par exemple, en utilisant fetch() pour effectuer une requête POST

    fetch('/votre-endpoint', {
      method: 'POST',
      body: formDataObject,
    })
      .then(response => response.json())
      .then(data => {
        // Gérez la réponse du backend ici
        console.log(data);
      })
      .catch(error => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default Formulaire;
