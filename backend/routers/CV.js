import { registerAnnonceCV } from "../models/Annonce/AnnonceCvCandidat.js";
import {
  confirmQualifiedTest,
  getWaitingList,
} from "../models/Annonce/Qualified_test.js";
import { getAllDepartement } from "../models/Departement/Departement.js";

/**
 *
 * @param {import("express").Express} app
 * @param {import("multer").Multer} uploads
 */
export const routersCV = (app, uploads) => {
  //
  // qualified
  app.get(
    "/getWaitingListAnnonce/:idannonce",
    uploads.none(),
    async (req, res) => {
      let result = await getWaitingList(null, req.params.idannonce);
      res.json(result);
    }
  );

  app.post("/insertCVCandidatAnnonce", uploads.none(), async (req, res) => {
    let data = JSON.parse(req.body.data);
    let result = await registerAnnonceCV(
      null,
      data.code_candidat,
      data.id_annonce,
      data.details_cv
    );
    res.json(result);
  });

  app.put("/confirmToTestCV", uploads.none(), async (req, res) => {
    let data = JSON.parse(req.body.data);
    let result = await confirmQualifiedTest(null, data.id);
    res.json(result);
  });
};
