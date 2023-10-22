import Client from "pg";
import { getConnectionPg } from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";
import { getCandidat, registerCandidat } from "../Candidat/Candidat.js";
import { getTimeNow } from "../../utils/Time.js";
import { registerCvCandidatDetails } from "../Candidat/CvCandidatDetails.js";
import { addToWaitingList } from "./Qualified_test.js";

export const annonce_cv_candidat = {
  id: 0,
  id_annonce: 10,
  date_depot: new Date(),
  id_candidat: 10,
};
// RAHA CANDIDAT mbola tsy enregistrer de mamorona fiche ho anazy
//
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerAnnonceCV = async (
  client = null,
  code_candidat = null,
  id_annonce,
  details_cv,
  nom = "unknown"
) => {
  let response = null;
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  try {
    await client.query("BEGIN TRANSACTION");
    // le nom aona
    let candidat = await checkCandidat(client, code_candidat, nom);
    let annonce_cv_candidat = await insertAnnonceCv(
      client,
      candidat.id,
      id_annonce
    );
    let points = 0;
    for (let i = 0; i < details_cv.length; i++) {
      points += await registerCvCandidatDetails(
        client,
        details_cv[i],
        annonce_cv_candidat.id,
        id_annonce
      );
    }

    await addToWaitingList(client, {
      id_candidat: candidat.id,
      id_annonce: id_annonce,
      score: points,
    });

    response = buildResponse("good", `Cv registred`, {
      candidat: candidat,
      annonce_cv_candidat: annonce_cv_candidat,
    });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(err);
  } finally {
    if (inner) await client.end();
  }
  return response;
};

const checkCandidat = async (client, code_candidat, nom) => {
  let candidat = await getCandidat(client, code_candidat);
  if (candidat === null) {
    candidat = await registerCandidat(client, nom);
  }
  return candidat;
};

const insertAnnonceCv = async (client, id_candidat, id_annonce) => {
  await client.query(
    "INSERT INTO annonce_cv_candidat VALUES (default, $1,$2,$3)",
    [id_annonce, getTimeNow(), id_candidat]
  );
  let annonceCv = await getLastAnnonceCv(client);
  return annonceCv;
};

/**
 *
 * @param {Client.Client} client
 * @returns
 */
const getLastAnnonceCv = async (client) => {
  let rowsResult = 0;
  try {
    let result = await client.query(
      "SELECT MAX(id) as last FROM annonce_cv_candidat"
    );
    rowsResult = result.rows[0].last;
    result = await client.query(
      "SELECT * FROM annonce_cv_candidat WHERE id = $1",
      [rowsResult]
    );
    rowsResult = result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
  return rowsResult;
};
