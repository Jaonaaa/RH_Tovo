import Client from "pg";
import { getConnectionPg } from "../connection/Connection.js";

const departement = {
  id: 0,
  nom: "",
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

export const insertDepartement = async (name) => {
  const client = await getConnectionPg();
  try {
    let exist = await checkDepartementAlreadyExists(client, name);
    if (!exist) {
      await client.query("INSERT INTO departement VALUES (default, $1)", [
        name,
      ]);
    } else {
      console.log("Existe Déja");
    }
  } catch (err) {
    throw new Error(err);
  } finally {
    client.end();
  }
};

/**
 *
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
