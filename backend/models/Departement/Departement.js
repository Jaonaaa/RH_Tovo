import Client from "pg";
import { getConnectionPg } from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";

export const departement = {
  id: 0,
  nom: "",
  description: "",
  icon: "",
};

export const getAllDepartement = async () => {
  const client = await getConnectionPg();
  let rowsResult = [];
  try {
    const result = await client.query("SELECT * FROM departement");
    rowsResult = result.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    client.end();
  }
  return rowsResult;
};
/**
 *
 * @param {String} name
 * @returns
 */
export const insertDepartement = async (name, description, icon) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    let exist = await checkDepartementAlreadyExists(client, name);

    if (!exist) {
      await client.query("BEGIN TRANSACTION");
      await client.query("INSERT INTO departement VALUES (default, $1,$2,$3)", [
        name,
        description,
        icon,
      ]);
      response = buildResponse("good", `Département enregistré`, []);
      await client.query("COMMIT");
    } else {
      response = buildResponse(
        "error",
        `Département ${name} already exists`,
        []
      );
    }
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    client.end();
  }
  return response;
};
/**
 * @param {Client.Client} client
 * @param {String} name
 */
export const checkDepartementAlreadyExists = async (client, name) => {
  let countRow = 0;
  try {
    const result = await client.query(
      "SELECT * FROM departement WHERE nom = $1 ",
      [name]
    );
    countRow = result.rowCount;
  } catch (err) {
    throw new Error(err);
  }
  return countRow > 0 ? true : false;
};
