import Client from "pg";

export const details_requete_departement = {
  id: 0,
  vol_tache: 0,
  vol_horaire: 0,
  vol_hommme_jour: 0,
};
/**
 *
 * @param {details_requete_departement} data
 * @param {Client.Client} client
 */
export const registerDepartementRequestDetails = async (data, client) => {
  let id = -1;
  try {
    await client.query(
      "INSERT INTO details_requete_departement VALUES (default,$1,$2,$3)",
      [data.vol_tache, data.vol_horaire, data.vol_hommme_jour]
    );
    id = await getLast(client);
  } catch (err) {
    throw new Error(err);
  }
  return id;
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
      "SELECT MAX(id) as last FROM details_requete_departement"
    );
    rowsResult = result.rows[0].last;
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};
