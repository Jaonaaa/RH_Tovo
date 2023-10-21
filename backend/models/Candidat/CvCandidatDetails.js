export const cv_candidat_details = {
  id: 0,
  id_annonce_cv_candidat: 10,
  valeur: 1,
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerCvCandidatDetails = async (
  client = null,
  details_cv,
  id_annonce
) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let valeur = 0;
  try {
    // calcul anleh valeur azon le olona amleh CV any
    details_cv;
    //
    valeur = 10;
    //
    await client.query(
      "INSERT INTO cv_candidat_details VALUES (default,$1,$2)",
      [id_annonce, valeur]
    );
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return valeur;
};
