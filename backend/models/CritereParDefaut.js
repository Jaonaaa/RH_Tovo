import getConnectionPg from "../connection/Connection.js";
import { buildResponse } from "../utils/Status.js";

export const critere_par_defaut = {
  id: 0,
  nom: "",
};

const critere_par_defaut___ = [
  "Diplome",
  "Localisation",
  "Expérience",
  "Situation matrimoniale",
];

export const insertDefaultCriteria = async (label) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    await client.query("INSERT INTO critere_par_defaut VALUES (default,$1)", [
      label,
    ]);

    response = buildResponse("good", "Critère par défaut ajouter");
  } catch (err) {
    await client.query("ROLLBACK");
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};
