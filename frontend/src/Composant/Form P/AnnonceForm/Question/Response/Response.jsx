import React, { useRef, useState } from "react";
import CrossIcon from "../../../../../assets/img/CrossIcon";
import "./style/style.css";
import CheckIcon from "../../../../../assets/img/CheckIcon";

const Response = ({ index, value, removeReponse }) => {
  const [editable, setEditable] = useState(true);
  const [responseValue, setResponse] = useState(value);
  const [correctResponse, setCorrectResponse] = useState(false);
  const checkbox = useRef(null);
  const handleResponse = (e) => {
    setResponse(e.target.value);
  };
  const handleChecked = (e) => {
    setCorrectResponse(e.target.checked);
  };
  const toogleChecked = () => {
    if (checkbox.current.checked) setCorrectResponse(false);
    else setCorrectResponse(true);
  };

  return (
    <>
      <div className="block_reponse">
        <div
          className="delete_reponse"
          onClick={() => {
            removeReponse(index);
          }}
        >
          <CrossIcon />
        </div>

        <input
          type="text"
          name="reponse"
          onChange={handleResponse}
          value={responseValue}
          disabled={!editable}
          placeholder="Reponse"
        />
        <div className="checkbox">
          <div
            className={`checkbox_up ${correctResponse ? "checkbox_up_on" : ""}`}
            onClick={toogleChecked}
          >
            <CheckIcon />
          </div>
          <input
            ref={checkbox}
            type="checkbox"
            name="correct"
            onChange={handleChecked}
            checked={correctResponse}
            disabled={!editable}
          />
        </div>
      </div>
    </>
  );
};

export default Response;
