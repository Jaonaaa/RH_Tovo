import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";
import { getTimeNow } from "../../utils/Time.js";
import {
  details_requete_departement,
  getDetailsRequest,
  registerDepartementRequestDetails,
} from "./DetailsRequeteDepartement.js";

export const requete_departement = {
  id: 0,
  id_details_requete_departement: 10,
  date_requete: new Date(),
  id_departement: 10,
};

/**
 *
 * @param {requete_departement} data
 * @param {details_requete_departement} dataDetails
 */
export const registerDepartementRequest = async (data, dataDetails) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    await client.query("BEGIN TRANSACTION");
    //
    let id_details_requete_departement =
      await registerDepartementRequestDetails(dataDetails, client);
    ////
    await client.query(
      "INSERT INTO requete_departement VALUES (default,$1,$2,$3)",
      [id_details_requete_departement, getTimeNow(), data.id_departement]
    );
    await client.query("COMMIT");

    response = buildResponse("good", "Requete de departement enregistrer");
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};

export const getListRequestAll = async () => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    let rowsResult = [];
    ////
    const result = await client.query("SELECT * FROM requete_departement ");
    rowsResult = result.rows;

    for (let i = 0; i < rowsResult.length; i++) {
      rowsResult[i].details = await getDetailsRequest(
        rowsResult[i]["id_details_requete_departement"],
        client
      );
    }

    response = buildResponse("good", "", rowsResult);
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};

/**
 *
 * @param {Number} idDepartement
 * @returns
 */
export const getListRequest = async (idDepartement) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    let rowsResult = [];
    ////
    const result = await client.query(
      "SELECT * FROM requete_departement where id_departement = $1",
      [idDepartement]
    );
    rowsResult = result.rows;

    for (let i = 0; i < rowsResult.length; i++) {
      rowsResult[i].details = await getDetailsRequest(
        rowsResult[i]["id_details_requete_departement"],
        client
      );
    }

    response = buildResponse("good", "", rowsResult);
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};
