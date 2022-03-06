export interface BMIInfo {
  height: number;
  weight: number;
}

export const calculateBMI = ({ height, weight }: BMIInfo): string => {
  const bmi = (100 ** 2 * weight) / height ** 2;
  if (bmi >= 30) {
    return "Obese (ultra over weight)";
  } else if (bmi > 25) {
    return "Overweight (over weight)";
  } else {
    return "Normal (healthy weight)";
  }
};
