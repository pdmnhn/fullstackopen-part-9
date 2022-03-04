interface BMIInfo {
  height: number;
  weight: number;
}
const parseArguments = (args: string[]): BMIInfo => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBMI = ({ height, weight }: BMIInfo): string => {
  const bmi = (100 ** 2 * weight) / height ** 2;
  if (bmi >= 30) {
    return "Obese (ultra over weight)";
  } else if (bmi > 25) {
    return "Overweight (over weight)";
  } else {
    return "Normal (healthy weight)";
  }
};

const bmiInfo = parseArguments(process.argv);
console.log(calculateBMI(bmiInfo));
