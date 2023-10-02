import { insertDefaultCriteria } from "../models/CritereParDefaut.js";
import {
  getAllDepartement,
  insertDepartement,
} from "../models/Departement/Departement.js";
import { registerDepartementRequest } from "../models/Departement/RequeteDepartement.js";
import { buildResponse } from "../utils/Status.js";
import { getTimeNow } from "../utils/Time.js";
/**
 *
 * @param {import("express").Express} app
 * @param {import("multer").Multer} uploads
 */
export const routersAdmin = (app, uploads) => {
  //
  // Departement
  app.get("/getAllDepartement", uploads.none(), async (req, res) => {
    let departement = await getAllDepartement();
    res.json(buildResponse("good", "", departement));
  });

  app.post("/addNewDepartement", uploads.none(), async (req, res) => {
    let data = req.body;
    console.log(data);
    let response = await insertDepartement(data.departement_name);
    res.json(response);
  });
  // Requete par departement
  app.post("/registerRequestDepartement", uploads.none(), async (req, res) => {
    let data = JSON.parse(req.body.data);
    console.log(data);
    let response = await registerDepartementRequest(
      data.requete_d,
      data.details_req
    );
    res.json(response);
  });
  // Annonce
};

// let drd = {
//   id: 0,
//   vol_tache: 5,
//   vol_horaire: 8,
//   vol_hommme_jour: 2,
// };
// let rd = {
//   id: 0,
//   id_details_requete_departement: 10,
//   date_requete: getTimeNow(),
//   id_departement: 1,
// };

// let response = await registerDepartementRequest(rd, drd);
// console.log(response);

// insertDefaultCriteria("Diplome");
// insertDefaultCriteria("Localisation");
// insertDefaultCriteria("Expérience");
// insertDefaultCriteria("Situation matrimoniale");
