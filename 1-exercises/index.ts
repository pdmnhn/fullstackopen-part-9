import express from "express";
import { calculateBMI } from "./calculateBMI";
import { calculateExercises } from "./calculateExercises";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }

  res.status(200).json({
    weight: Number(weight),
    height: Number(height),
    bmi: calculateBMI({ height, weight }),
  });
});

interface ExercisesInput {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ExercisesInput = req.body;
  if (!data.target || !data.daily_exercises) {
    res.status(400).send({
      error: "parameters missing",
    });
  }

  const array = [data.target, ...data.daily_exercises];
  if (!(data.daily_exercises instanceof Array) || !allNumbers(array)) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }

  res.status(200).json(calculateExercises(array));
});

const allNumbers = (nums: number[]): boolean => {
  for (const i of nums) {
    if (isNaN(Number(i))) {
      return false;
    }
  }
  return true;
};

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Live at http://localhost:${PORT}`);
});
