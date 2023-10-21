import Client from "pg";
import { buildResponse } from "../../utils/Status.js";
import getConnectionPg from "../../connection/Connection.js";

export const qualified_test = {
  id: 0,
  id_candidat: 10,
  id_annonce: 10,
  score: 1,
  validate: false,
};

/**
 *
 * @param {Client.Client} client
 * @param {qualified_test} data
 * @returns
 */
export const addToWaitingList = async (client = null, data) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let reponse = null;
  try {
    if (inner) await client.query("BEGIN TRANSACTION");
    await client.query(
      "INSERT INTO qualified_test VALUES (default, $1,$2,$3,$4)",
      [data.id_candidat, data.id_annonce, data.score, false]
    );
    reponse = buildResponse("good", "added to waiting list");
    if (inner) await client.query("COMMIT");
  } catch (err) {
    if (inner) await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return reponse;
};

/**
 *
 * @param {Client.Client} client
 * @param {qualified_test} data
 * @returns
 */
export const confirmQualifiedTest = async (client = null, id) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let reponse = null;
  try {
    if (inner) await client.query("BEGIN TRANSACTION");
    await client.query(
      "UPDATE qualified_test SET validate = $1 WHERE id = $2",
      [true, id]
    );
    reponse = buildResponse("good", "confirm to test");
    if (inner) await client.query("COMMIT");
  } catch (err) {
    if (inner) await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return reponse;
};

/**
 *
 * @param {Client.Client} client
 * @param {qualified_test} data
 * @returns
 */
export const getWaitingList = async (client = null, id_annonce) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let reponse = null;
  try {
    const response = await client.query(
      "SELECT * FROM qualified_test WHERE id_annonce = $1",
      [id_annonce]
    );
    reponse = buildResponse("good", "", response.rows);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return reponse;
};
