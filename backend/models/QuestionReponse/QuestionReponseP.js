import Client from "pg";
import { getReponses, registerReponses } from "./ReponseP.js";
import { getQuestionType } from "./Question.js";

export const question_reponse_p = {
  id: 0,
  id_question: 10,
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const getQuestionReponses = async (client = null, id) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let rowsResult = null;
  try {
    const result = await client.query(
      "SELECT * FROM question_reponse_p WHERE id = $1 ",
      [id]
    );
    if (result.rowCount > 0) {
      let row = result.rows[0];
      let type = await getQuestionType(client, row.id_question);
      let responses = await getReponses(client, row.id);
      rowsResult = {
        type: type,
        responses: responses,
      };
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return rowsResult;
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerQuestionReponses = async (
  client = null,
  data_question
) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let idQuestionReponse = -1;
  try {
    await client.query("INSERT INTO  question_reponse_p VALUES (default,$1)", [
      +data_question.type,
    ]);

    idQuestionReponse = await getLast(client);

    for (let i = 0; i < data_question.reponses.length; i++) {
      let reponse = data_question.reponses[i];
      await registerReponses(client, idQuestionReponse, reponse);
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return idQuestionReponse;
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
const getLast = async (client) => {
  let rowsResult = 0;
  try {
    const result = await client.query(
      "SELECT MAX(id) as last FROM question_reponse_p"
    );
    rowsResult = result.rows[0].last;
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};
