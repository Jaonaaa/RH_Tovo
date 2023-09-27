import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getAllDepartement, insertDepartement } from "./models/Departement.js";
import { buildResponse } from "./utils/Status.js";
import { uploads } from "./Config.js";

const app = express();
const port = 3202;
// insertDepartement("Ressource humaine");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getAllDepartement", uploads.none(), async (req, res) => {
  let departement = await getAllDepartement();
  res.json(buildResponse("good", "", departement));
});

app.post("/uploads", uploads.array("file"), (req, res) => {
  let data = req.body;
  console.log(data);
  res.status(200).json({ details: "Files uploaded!" });
});

app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
