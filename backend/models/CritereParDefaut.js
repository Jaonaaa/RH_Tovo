import Client from "pg";
import getConnectionPg from "../connection/Connection.js";
import { buildResponse } from "../utils/Status.js";

export const critere_par_defaut = {
  id: 0,
  nom: "",
  id_question_reponse_p: 1,
};

const critere_par_defaut___ = [
  "Diplome",
  "Localisation",
  "Expérience",
  "Situation matrimoniale",
];

export const insertDefaultCriteria = async (label, question_reponse) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    // await client.query("INSERT INTO critere_par_defaut VALUES (default,$1)", [
    //   label,
    // ]);
    // response = buildResponse("good", "Critère par défaut ajouter");
  } catch (err) {
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const getAllDefaultCriteria = async (client = null) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = [];
  try {
    //
    let result = await client.query("SELECT * FROM critere_par_defaut ");
    response = result.rows;
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};
