import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";

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
export const addAnnonce = async (data) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    await client.query("BEGIN TRANSACTION");
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
