import Client from "pg";

import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";
import { getTimeNow } from "../../utils/Time.js";
import { getAllDefaultCriteria } from "../CritereParDefaut.js";
import { getAllQuestionType } from "../QuestionReponse/Question.js";
import { getQuestionReponses } from "../QuestionReponse/QuestionReponseP.js";
import { getAnnonceDetails, registerAnnonceDetails } from "./AnnonceDetails.js";

export const annonce = {
  id: 0,
  date_annonce: new Date(),
  titre: "",
  id_departement: 10,
};

/**
 *
 * @param {requete_departement} data
 * @param {details_requete_departement} dataDetails
 */
export const addAnnonce = async (data_details, titre, id_departement) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    await client.query("BEGIN TRANSACTION");
    //
    await client.query("INSERT INTO annonce VALUES (default,$1,$2,$3)", [
      getTimeNow(),
      titre,
      id_departement,
    ]);
    let idAnnonce = await getLast(client);
    for (let i = 0; i < data_details.length; i++) {
      let row_details = data_details[i];
      await registerAnnonceDetails(
        client,
        row_details.coeff,
        row_details.label,
        idAnnonce,
        row_details.question_reponse
      );
    }

    //
    await client.query("COMMIT");
    response = buildResponse("good", "Annonce publié");
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
 * @param {Number} idAnnonce
 * @returns
 */
export const getAnnonce = async (client = null, idAnnonce) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = {};
  try {
    //
    let result = await client.query("SELECT * FROM annonce where id = $1", [
      idAnnonce,
    ]);
    if (result.rowCount > 0) {
      let details = await getAnnonceDetails(client, idAnnonce);
      response = {
        principale: result.rows[0],
        details: details,
      };
    }
  } catch (err) {
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};

/**
 *
 * @param {Number} idAnnonce
 * @returns
 */
export const getAllAnnonce = async (client = null) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = [];
  try {
    //
    let result = await client.query("SELECT * FROM annonce ");
    for (let i = 0; i < result.rows.length; i++) {
      let row = result.rows[i];
      response.push(await getAnnonce(client, row.id));
    }
  } catch (err) {
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};
/**
 * @param {Number} idAnnonce
 * @returns
 */
export const getAllAnnonceByDept = async (client = null, idDept) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = [];
  try {
    //
    let result = await client.query(
      "SELECT * FROM annonce where id_departement = $1",
      [idDept]
    );

    for (let i = 0; i < result.rows.length; i++) {
      let row = result.rows[i];
      response.push(await getAnnonce(client, row.id));
    }
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};

/**
 *
 * @param {requete_departement} data
 * @param {details_requete_departement} dataDetails
 */
export const getAnnonceDefaultData = async () => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    let allQuestionsType = await getAllQuestionType(client);
    let critere_par_defaut = await getAllDefaultCriteria(client);
    let allCritere = [];
    for (let i = 0; i < critere_par_defaut.length; i++) {
      let critere = critere_par_defaut[i];
      let questionsReponses = await getQuestionReponses(
        client,
        critere.id_question_reponse_p
      );
      questionsReponses.label = critere.nom;
      questionsReponses.coeff = critere.coeff;
      allCritere.push(questionsReponses);
    }

    response = buildResponse("good", "Données d'annonce par défaut", {
      all_questions_type: allQuestionsType,
      default_criteria: allCritere,
    });
  } catch (err) {
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
const getLast = async (client) => {
  let rowsResult = 0;
  try {
    const result = await client.query("SELECT MAX(id) as last FROM annonce");
    rowsResult = result.rows[0].last;
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};
