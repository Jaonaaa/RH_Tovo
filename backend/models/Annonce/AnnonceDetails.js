import Client from "pg";
import getConnectionPg from "../../connection/Connection.js";
import {
  getQuestionReponses,
  registerQuestionReponses,
} from "../QuestionReponse/QuestionReponseP.js";

export const annonce_details = {
  id: 0,
  id_annonce: 10,
  label_critere: "",
  coef: 0,
  id_question_reponse_p: 10,
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerAnnonceDetails = async (
  client = null,
  coeff,
  label,
  idAnnonce,
  questionsReponses = { type: 4, responses: [] }
) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  try {
    let idQuestionReponse = await registerQuestionReponses(
      client,
      questionsReponses
    );

    await client.query(
      "INSERT INTO annonce_details VALUES (default,$1,$2,$3,$4)",
      [idAnnonce, label, coeff, idQuestionReponse]
    );
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const getAnnonceDetails = async (client = null, idAnnonce) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let resultArray = [];
  try {
    let result = await client.query(
      "SELECT * FROM annonce_details WHERE id_annonce = $1 ",
      [idAnnonce]
    );
    for (let i = 0; i < result.rows.length; i++) {
      let row = result.rows[i];
      let responses = await getQuestionReponses(
        client,
        row.id_question_reponse_p
      );
      row.criteres = responses;
      resultArray.push(row);
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return resultArray;
};
