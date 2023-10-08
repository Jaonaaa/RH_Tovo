import React, { useState } from "react";
import "./../../../assets/css/style.css";
import Question from "./Question/Question";

const AnnonceForm = () => {
  const [questions, setQuestion] = useState([
    { id: (Math.random() * 10000).toFixed(0) },
    { id: (Math.random() * 10000).toFixed(0) },
  ]);
  const addQuestions = () => {
    let newQuestion = [
      ...questions,
      { id: (Math.random() * 10000).toFixed(0) },
    ];
    setQuestion(newQuestion);
  };
  const removeQuestions = (id) => {
    let newQuestion = questions.filter((question) => question.id !== id);
    setQuestion(newQuestion);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let criteres = e.target.querySelectorAll(".critere_container");
    let critèresHello = [];
    ///
    criteres.forEach((critereBlock) => {
      let idType = critereBlock.querySelector("input[name=type_critere]").value;
      let reponses = [];
      critereBlock.querySelectorAll(".block_reponse").forEach((reponse) =>
        reponses.push({
          label: reponse.querySelector("input[name=reponse]").value,
          correct: reponse.querySelector("input[name=correct]").checked,
        })
      );
      critèresHello.push({
        label: critereBlock.querySelector("input[name=critere_name]").value,
        coeff: critereBlock.querySelector("input[name=coeff]").value,
        question_reponse: {
          type: idType, //idType
          reponses: reponses,
        },
      });
    });
    console.log(critèresHello);

    // return critèresHello;
    let data = JSON.stringify(critèresHello);
    let formData = new FormData();
    formData.append("data", data);
    sendData(formData, "http://localhost:3202/test");
  };

  let optionsType = [
    { label: "Select", valeur: 1 },
    { label: "Multiple Choice", valeur: 2 },
    { label: "Number", valeur: 3 },
    { label: "Text", valeur: 4 },
  ];

  return (
    <div className="container_annonce_form">
      <div className="title">Form container </div>
      <form
        action="/"
        method="post"
        className="form_question"
        onSubmit={handleSubmit}
      >
        <div className="questions_container">
          {questions.map((question) => (
            <Question
              optionsType={optionsType}
              removeQuestion={removeQuestions}
              id={question.id}
              key={question.id}
            />
          ))}
        </div>
        <div className="details">
          <button onClick={addQuestions}>Add Question</button>
          <button>Validate</button>
        </div>
      </form>
    </div>
  );
};

export default AnnonceForm;
const sendData = async (data, url = "http://localhost:3202/test") => {
  let result = await fetch(url, {
    body: data,
    method: "POST",
  }).catch((err) => {
    console.error(err);
  });
  let dataResult = await result.json();
  console.log(dataResult);
};
