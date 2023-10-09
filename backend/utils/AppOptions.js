import session from "express-session";
import cors from "cors";

/**
 *
 * @param {import("express").Express} app
 * @param {import("multer").Multer} uploads
 */
export const setUpApp = (app) => {
  const corsOptions = {
    origin: true, // Only allow requests from this origin
    methods: "GET,POST", // Allow only specific HTTP methods
    allowedHeaders: "*", // Allow only specific headers
    credentials: true,
  };
  app.use(
    session({
      secret: "secreteKeyyy",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cors(corsOptions));
};
