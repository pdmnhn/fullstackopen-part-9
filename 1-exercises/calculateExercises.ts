export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (info: number[]): Result => {
  const result: Result = {
    periodLength: info.length - 1,
    trainingDays: 0,
    rating: 0,
    success: true,
    ratingDescription: "not too bad but could be better",
    target: info[0],
    average: 0,
  };

  for (let i = 1, n = info.length; i < n; ++i) {
    if (info[i] > 0) {
      ++result.trainingDays;
      result.average += info[i];
    }
    if (info[i] < result.target) {
      result.success = false;
    }
  }
  result.average /= result.periodLength;
  result.rating = Math.ceil((5 * result.trainingDays) / result.periodLength);
  return result;
};
