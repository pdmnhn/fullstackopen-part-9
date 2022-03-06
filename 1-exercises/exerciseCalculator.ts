import { calculateExercises } from "./calculateExercises";

const parseArguments = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const argsArray: number[] = [];

  for (let i = 2, n = args.length; i < n; ++i) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers");
    } else {
      argsArray.push(Number(args[i]));
    }
  }

  return argsArray;
};

console.log(calculateExercises(parseArguments(process.argv)));

export {};
