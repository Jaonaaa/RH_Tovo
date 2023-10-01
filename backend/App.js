import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { uploads } from "./Config.js";
import { routersAdmin } from "./routers/Admin.js";
import cors from "cors";

const app = express();
const port = 3202;
const corsOptions = {
  origin: "*", // Only allow requests from this origin
  methods: "GET,POST", // Allow only specific HTTP methods
  allowedHeaders: "*", // Allow only specific headers
};

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

routersAdmin(app, uploads);

// mila precisena mitovy am "file" io ny anarana ny <input type="file" name=$$ />
app.post("/uploads", uploads.array("file"), (req, res) => {
  let data = req.body;
  console.log(data);
  res.status(200).json({ details: "Files uploaded!" });
});

app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
