import Client from "pg";
import { getAnnonceDetails } from "../Annonce/AnnonceDetails.js";
import getConnectionPg from "../../connection/Connection.js";
import { reponse_p } from "../QuestionReponse/ReponseP.js";

export const cv_candidat_details = {
  id: 0,
  id_annonce_cv_candidat: 10,
  valeur: 1,
  id_annonce_details: 10,
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerCvCandidatDetails = async (
  client = null,
  details_cv,
  id_annonce_cv_candidat,
  id_annonce
) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let valeur = 0;
  try {
    // calcul anleh valeur azon le olona amleh CV any
    valeur = await getPoints(client, id_annonce, details_cv);
    //

    await client.query(
      "INSERT INTO cv_candidat_details VALUES (default,$1,$2,$3)",
      [id_annonce_cv_candidat, valeur, details_cv.id_annonce_details]
    );
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return valeur;
};

let details_cv = {
  id_annonce_details: 8,
  id_question_reponse_p: 2,
  reponses: "",
};
/**
 *
 * @param {Client.Client} client
 * @param {Number} id_annonce
 * @param {details_cv } details_cv
 * @returns
 */
const getPoints = async (client, id_annonce, details_cv) => {
  let annonce_details = await getAnnonceDetails(client, id_annonce);
  annonce_details = annonce_details.filter(
    (annonce_detail) =>
      annonce_detail.id_question_reponse_p === details_cv.id_question_reponse_p
  );
  if (annonce_details.length > 0) annonce_details = annonce_details[0];
  else throw new Error("id_question_reponse_p non existant");

  let points = 0;
  let coeff = +annonce_details.coef;
  let criteres = annonce_details.criteres;
  let type = criteres.type.type;
  // reponses needed

  if (type === "Select" || type === "Choix multiple") {
    let arrayQuestion = details_cv.reponses.split(",");
    let trueReponses = criteres.responses
      .map((response) => {
        if (response.correct) return response.label;
      })
      .filter((response) => response != undefined);
    arrayQuestion.forEach((q) => {
      // le moins atao rehefa test
      if (trueReponses.includes(q)) points += coeff;
    });
  } else {
    if (details_cv.reponses.trim() !== "") points = coeff;
  }
  return points;
};
