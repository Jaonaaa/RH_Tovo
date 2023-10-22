import Client from "pg";
import { buildResponse } from "../../utils/Status.js";
import getConnectionPg from "../../connection/Connection.js";

export const candidat = {
  id: 0,
  nom: "",
  code_id: "",
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerCandidat = async (client = null, nom) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let reponse = null;
  try {
    let code_candidat = generateCode(8);
    if (inner) await client.query("BEGIN TRANSACTION");
    await client.query("INSERT INTO candidat VALUES (default, $1,$2)", [
      nom,
      code_candidat,
    ]);
    reponse = {
      ...(await getLastCandidat(client)),
    };
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
 * @returns
 */
export const getCandidat = async (client = null, code_id) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let reponse = null;
  try {
    const result = await client.query(
      "SELECT * FROM candidat WHERE code_id = $1",
      [code_id]
    );
    if (result.rows.length > 0) reponse = result.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return reponse;
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
const getLastCandidat = async (client) => {
  let rowsResult = 0;
  try {
    let result = await client.query("SELECT MAX(id) as last FROM candidat");
    rowsResult = result.rows[0].last;
    result = await client.query("SELECT * FROM candidat WHERE id = $1", [
      rowsResult,
    ]);
    rowsResult = result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};

function generateCode(length) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet.charAt(randomIndex);
  }

  return code;
}
