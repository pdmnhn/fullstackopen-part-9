import express from "express";
import data from "../data/patients";
import {
  addNewPatient,
  getData,
  toNewPatientEntry,
} from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.status(200).json(getData());
});

patientsRouter.get("/:id", (req, res) => {
  const id: unknown = req.params.id;
  if (!id || !(typeof id === "string")) {
    res.status(400).send({ error: "Bad id" });
    return;
  }
  res.status(200).json(data.find((item) => item.id === id));
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
