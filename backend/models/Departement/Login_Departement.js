import Client from "pg";
import { buildResponse } from "../../utils/Status.js";
import getConnectionPg from "../../connection/Connection.js";

export const login_departement = {
  id: 0,
  nom: "",
  email: "",
  mdp: "",
  id_departement: 0,
};
/**
 *
 * @param {login_departement} data
 * @param {Client.Client} client
 */
export const registerLogin = async (data, client) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let inserted = false;
  try {
    await client.query("BEGIN TRANSACTION");
    await client.query(
      "INSERT INTO login_departement VALUES (default,$1,$2,$3,$4)",
      [data.nom, data.email, data.mdp, data.id_departement]
    );
    await client.query("COMMIT");
    inserted = true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    if (inner) client.end();
  }
  return inserted;
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
      "SELECT MAX(id) as last FROM login_departement"
    );
    rowsResult = result.rows[0].last;
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
const getLogin = async (client = null, email, mdp) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let rowsResult = null;
  try {
    const result = await client.query(
      "SELECT * FROM login_departement WHERE email = $1 AND mdp = $2",
      [email, mdp]
    );
    if (result.rowCount > 0) rowsResult = result.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return rowsResult;
};

export const checkLogin = async (req, email, mdp) => {
  let login = await getLogin(null, email, mdp);
  if (login) {
    req.session.userOn = login;
    console.log(req.session.userOn);
    return buildResponse("good", "", login);
  } else return buildResponse("error", "Aucun utilisateur correspondant");
};
