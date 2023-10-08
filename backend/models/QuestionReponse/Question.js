import Client from "pg";

import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";

export const question = {
  id: 0,
  type: "",
};

export const addQuestionType = async (type) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    await client.query("INSERT INTO question VALUES (default,$1)", [type]);

    response = buildResponse("good", "Type de Question enregistrér");
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};

export const getAllQuestionType = async (client = null) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = {};
  try {
    //
    let result = await client.query("SELECT * FROM question");
    response = result.rows;
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const getQuestionType = async (client = null, id) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = {};
  try {
    //
    let result = await client.query("SELECT * FROM question where id = $1", [
      id,
    ]);
    if (result.rowCount > 0) response = result.rows[0];
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};
