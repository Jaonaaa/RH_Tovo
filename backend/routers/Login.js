import session from "express-session";

import { buildResponse } from "../utils/Status.js";
import { checkLogin } from "../models/Departement/Login_Departement.js";
/**
 *
 * @param {import("express").Express} app
 * @param {import("multer").Multer} uploads
 */
export const routersLogin = async (app, uploads) => {
  // Session
  app.post("/login_in", uploads.none(), async (req, res) => {
    let data = req.body;
    let result = await checkLogin(req, data.email, data.mdp);
    return res.json(result);
  });

  app.post("/disconnect", uploads.none(), async (req, res) => {
    req.session.destroy((err) => {
      console.log(err);
    });
    return res.json(buildResponse("good", "session destroyed / déconnecter"));
  });
  app.get("/getToken", uploads.none(), async (req, res) => {
    let result = req.session.userOn;
    console.log("tewt");
    if (result == null) res.json(buildResponse("error", "aucun token"));
    else res.json(buildResponse("good", "", result));
  });
};
