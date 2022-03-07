import express from "express";
import patientsRouter from "./src/routes/patients";
import diagnosesRouter from "./src/routes/diagnoses";

const app = express();

app.use(express.static("frontend"));
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.status(200).send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
