import React, { useState, useEffect, useRef } from "react";
import CaretDownIcon from "../../../../../assets/img/CarteDownIcon";
import "./style/style.css";

const Select = ({ optionsType, name }) => {
  const [selectedOption, setSelectedOption] = useState({
    valeur: optionsType[0].valeur,
    label: optionsType[0].label,
  });
  const longContent = useRef(null);
  const [openOptions, setOpenOptions] = useState(false);
  const heightNecessary = 16 * 2.6 * optionsType.length;
  const [widthNecessary, setWidthNecessary] = useState(0);
  const longestText = getMaxLenghtText(optionsType);

  useEffect(() => {
    let width = longContent.current.getBoundingClientRect().width;
    setWidthNecessary(width + 3 * 16);
  }, []);

  const handleOpen = () => {
    if (openOptions) setOpenOptions(false);
    else setOpenOptions(true);
  };

  return (
    <div
      className="drop_down"
      tabIndex={0}
      onBlur={() => {
        setOpenOptions(false);
      }}
    >
      <input type="hidden" value={selectedOption.valeur} name={name} />
      <div className="container_label" onClick={handleOpen}>
        <div className="text" style={{ width: widthNecessary }}>
          {selectedOption.label}
          <div className="hiddenText" ref={longContent}>
            {longestText}
          </div>
        </div>
        <div
          className="icon"
          style={{ transform: openOptions ? `rotate(180deg)` : `rotate(0deg)` }}
        >
          <CaretDownIcon />
        </div>
      </div>
      <div
        className={`container_options`}
        style={{ height: openOptions ? heightNecessary : 0 }}
      >
        {optionsType.map((option, index) => (
          <div
            className="option_drop_down"
            key={index}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// use only for { valeur , label } Array
const getMaxLenghtText = (optionsType) => {
  return optionsType.filter((option, i, array) => {
    return (
      option.label.length ===
      Math.max(...array.map((option_in) => option_in.label.length))
    );
  })[0].label;
};

export default Select;
