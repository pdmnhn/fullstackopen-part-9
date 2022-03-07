import express from "express";
import diagnoseEntries from "../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.status(200).json(diagnoseEntries);
});

export default diagnosesRouter;
