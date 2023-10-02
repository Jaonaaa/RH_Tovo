import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";
import { getTimeNow } from "../../utils/Time.js";
import {
  details_requete_departement,
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
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};
