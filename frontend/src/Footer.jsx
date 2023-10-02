import React from "react";
import LogoFooter from "../../assets/svg/LogoFooter";

import "./style/style.css";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let criteres = form.querySelectorAll(".critere");

    let critèresHello = [];
    criteres.forEach((critereBlock) => {
      let idType = critereBlock.querySelector("select[name=type]").value;
      let critereName = critereBlock.querySelector(
        "input[name=critere_name]"
      ).value;
      let coefficient = critereBlock.querySelector("input[name=coeff]").value;
      let reponses = [];
      critereBlock.querySelectorAll(".block_reponse").forEach((reponse) =>
        reponses.push({
          label: reponse.querySelector("input[name=reponse]").value,
          correct: reponse.querySelector("input[name=correct]").checked,
        })
      );

      let object = {
        label: critereName,
        coeff: coefficient,
        question_reponse: {
          type: idType, //idType
          reponses: reponses,
        },
      };
      critèresHello.push(object);
    });

    console.log(critèresHello);
  };
  return (
    <div className="footer_container">
      <div className="footer_content">
        <div className="right_container">
          <div className="logo_container">
            <LogoFooter />
          </div>
        </div>
        <div className="left_container">
          <div className="nav_box">
            <div className="nav_link"> Contact Us</div>
            <div className="nav_link"> About Us</div>
          </div>
        </div>
      </div>

      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="critere">
          <label htmlFor="">Type input </label>
          <select name="type" id="">
            <option value="1">Select</option>
            <option value="2">Mutiple Choice</option>{" "}
            <option value="3">Number</option>
            <option value="4">Text</option>
          </select>
          <br />
          <label htmlFor=""> Label critère</label>
          <input type="text" name="critere_name" placeholder="Label critere" />
          <input type="number" name="coeff" placeholder="Coefficient" />
          <div className="block">
            Reponses :{"  "}
            <div className="ul">
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
            </div>
          </div>
        </div>

        <div className="critere">
          <label htmlFor="">Type input </label>
          <select name="type" id="">
            <option value="1">Select</option>
            <option value="2">Mutiple Choice</option>{" "}
            <option value="3">Number</option>
            <option value="4">Text</option>
          </select>
          <br />
          <label htmlFor=""> Label critère</label>
          <input type="text" name="critere_name" placeholder="Label critere" />
          <input type="number" name="coeff" placeholder="Coefficient" />
          <div className="block">
            Reponses :{"  "}
            <div className="ul">
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
              <div className="block_reponse">
                <input type="text" name="reponse" />
                <input type="checkbox" name="correct" />
              </div>
            </div>
          </div>
        </div>

        <button> Hello </button>
      </form>
    </div>
  );
}

export default Footer;
