import data from "../data/patients";
import { Gender, NewPatient, Patient, SafePatient } from "../types";
import { v1 as uuid } from "uuid";

const getSafePatient = (patient: Patient): SafePatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return { id, name, dateOfBirth, gender, occupation };
};

export const getData = (): SafePatient[] => {
  return data.map(getSafePatient);
};

const isString = (arg: unknown): arg is string => {
  return typeof arg === "string" || arg instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (arg: any): arg is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(arg);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (arg: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Boolean(Date.parse(arg));
};

const parseGender = (arg: unknown): Gender => {
  if (!arg || !isGender(arg)) {
    throw new Error("Missing or invalid gender");
  }
  return arg;
};

const parseDate = (arg: unknown): string => {
  if (!arg || !isString(arg) || !isDate(arg)) {
    throw new Error("Missing or invalid date");
  }
  return arg;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: Fields): NewPatient => {
  if (!name || !isString(name)) {
    throw new Error("Missing or invalid name");
  }

  if (!ssn || !isString(ssn)) {
    throw new Error("Missing or invalid SSN");
  }

  if (!occupation || !isString(occupation)) {
    throw new Error("Missing or invalid occupation");
  }

  const newEntry: NewPatient = {
    name,
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation,
    ssn,
    entries: [],
  };

  return newEntry;
};

export const addNewPatient = (patient: NewPatient): SafePatient => {
  const newPatient: Patient = { id: uuid(), ...patient };
  data.push(newPatient);
  return getSafePatient(newPatient);
};
