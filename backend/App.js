import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { uploads } from "./Config.js";
import { routersAdmin } from "./routers/Admin.js";
import { routersLogin } from "./routers/Login.js";
import { setUpApp } from "./utils/AppOptions.js";

const app = express();
const port = 3202;
setUpApp(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

routersAdmin(app, uploads);
routersLogin(app, uploads);

// mila precisena mitovy am "file" io ny anarana ny <input type="file" name=$$ />
app.post("/uploads", uploads.array("file"), (req, res) => {
  let data = req.body;
  res.status(200).json({ details: "Files uploaded!" });
});

app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
