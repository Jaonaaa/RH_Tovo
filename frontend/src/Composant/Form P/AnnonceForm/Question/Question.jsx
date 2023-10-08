import React, { useEffect, useRef, useState } from "react";
import "./style/style.css";
import Select from "./Select/Select";
import AddIcon from "./../../../../assets/img/AddIcon";
import Response from "./Response/Response";
import CrossIcon from "./../../../../assets/img/CrossIcon";
import ArrowDownIcon from "./../../../../assets/img/ArrowDownIcon";

const Question = ({
  optionsType,
  label = "",
  coefficient = 1,
  reponses = [],
  id,
  removeQuestion,
}) => {
  const [coeffValue, setCoeffValue] = useState(coefficient);
  const [labelCritere, setLabel] = useState(label);
  const [responsesList, setResponse] = useState(reponses);
  const [openQuestion, setOpenQuestion] = useState(false);
  const handleCoeff = (e) => {
    let value = (e.target.value + "").trim();
    if (value.length <= 2 && !isNaN(+value)) setCoeffValue(value);
  };
  const handleLabel = (e) => {
    let value = (e.target.value + "").trim();
    setLabel(value);
  };
  const handleQuestionOpen = () => {
    if (openQuestion) setOpenQuestion(false);
    else setOpenQuestion(true);
  };

  const addReponse = () => {
    setResponse([
      ...responsesList,
      { responseValue: "", id: (Math.random() * 10000).toFixed(0) },
    ]);
  };
  const removeReponse = (indexReponse) => {
    let reponses = responsesList.filter((re) => +re.id !== +indexReponse);
    setResponse(reponses);
  };

  return (
    <>
      <div
        className={`row_question_standalone ${openQuestion ? "show_line" : ""}`}
      >
        {" "}
        <div className="text_label">{openQuestion ? labelCritere : ""}</div>
        <div
          className="closer"
          onClick={() => {
            removeQuestion(id);
          }}
        >
          <CrossIcon />
        </div>
        <div
          className={`reply ${openQuestion ? "open_reply" : ""}`}
          onClick={handleQuestionOpen}
        >
          <ArrowDownIcon />
        </div>
      </div>
      <div
        className={`critere_container ${openQuestion ? "hide_container" : ""}`}
      >
        <div className="row_up">
          <div className="block">
            <label>Type :</label>
            <Select optionsType={optionsType} name={"type_critere"} />
          </div>
        </div>

        <div className="row_up">
          <div className="block">
            <label>Nom :</label>
            <input
              type="text"
              name="critere_name"
              placeholder="Label critere"
              value={labelCritere}
              onChange={handleLabel}
            />
          </div>
          <div className="block">
            <div className="up_block">
              <div className="text">Coeff</div>
              <input
                type="text"
                name="coeff"
                value={coeffValue}
                onChange={handleCoeff}
              />
            </div>
          </div>
        </div>
        <div className="row_up">
          <div className="block">
            <label>Réponses</label>
            <div className="add_button" onClick={addReponse}>
              <div className="icon">
                <AddIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="list_reponse">
          {responsesList.map((reponses, index) => (
            <Response
              key={reponses.id}
              index={reponses.id}
              value={reponses.responseValue}
              removeReponse={removeReponse}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
