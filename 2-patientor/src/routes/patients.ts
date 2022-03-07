import express from "express";
import {
  addNewPatient,
  getData,
  toNewPatientEntry,
} from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.status(200).json(getData());
});

patientsRouter.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const result = addNewPatient(newPatientEntry);
    res.status(201).json(result);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
