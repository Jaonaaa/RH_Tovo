import {
  addAnnonce,
  getAllAnnonce,
  getAllAnnonceByDept,
  getAnnonce,
  getAnnonceDefaultData,
} from "../models/Annonce/Annonce.js";
import { insertDefaultCriteria } from "../models/CritereParDefaut.js";
import {
  getAllDepartement,
  insertDepartement,
} from "../models/Departement/Departement.js";
import {
  getListRequest,
  getListRequestAll,
  registerDepartementRequest,
} from "../models/Departement/RequeteDepartement.js";
import { buildResponse } from "../utils/Status.js";
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
    let response = await insertDepartement(
      data.departement_name,
      data.departement_description,
      data.departement_icon,
      data.departement_color
    );
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

  app.post("/getRequestAllDepartement", uploads.none(), async (req, res) => {
    let response = await getListRequestAll();
    res.json(response);
  });

  app.post("/getRequestByDepartement", uploads.none(), async (req, res) => {
    let idDepartement = JSON.parse(req.body.idDepartement);
    let response = await getListRequest(idDepartement);
    res.json(response);
  });
  //
  //
  // Annonce
  app.get("/getDefaultAnnonceData", uploads.none(), async (req, res) => {
    let data = await getAnnonceDefaultData();
    res.json(data);
  });
  app.get("/getAllAnnonce", uploads.none(), async (req, res) => {
    let data = await getAllAnnonce();
    res.json(buildResponse("good", "", data));
  });
  app.get("/getAllAnnonceByDept", uploads.none(), async (req, res) => {
    let data = await getAllAnnonceByDept(null, 1);
    res.json(buildResponse("good", "", data));
  });
  // tadiavina kely maka valeur ana parametre am GET
  app.get("/getAnnonce", uploads.none(), async (req, res) => {
    let data = await getAnnonce(null, 16);
    res.json(buildResponse("good", "", data));
  });
  //
  app.post("/insertAnnonceData", uploads.none(), async (req, res) => {
    let data = JSON.parse(req.body.data);
    let result = await addAnnonce(
      data.details,
      data.titre,
      data.id_departement
    );
    res.json(result);
  });
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
