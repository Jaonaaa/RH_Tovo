import session from "express-session";
import cors from "cors";

/**
 *
 * @param {import("express").Express} app
 * @param {import("multer").Multer} uploads
 */
export const setUpApp = (app) => {
  const corsOptions = {
    origin: "*", // Only allow requests from this origin
    methods: "GET,POST", // Allow only specific HTTP methods
    allowedHeaders: "*", // Allow only specific headers
  };
  app.use(
    session({
      secret: "secreteKeyyy ",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cors(corsOptions));
};
