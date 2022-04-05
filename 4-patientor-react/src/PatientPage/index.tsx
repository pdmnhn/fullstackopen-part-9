import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryType from "../components/Entry";
import { apiBaseUrl } from "../constants";
import { addIndividualPatient, useStateValue } from "../state";
import { ExtendedPatient } from "../types";

const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [{ extendedPatients, diagnoses }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientList = async () => {
      if (id && !extendedPatients[id]) {
        try {
          const { data: patient } = await axios.get<ExtendedPatient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addIndividualPatient(patient));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatientList();
  }, [extendedPatients]);

  if (!id) {
    return <div>404 Error</div>;
  }

  const patient = extendedPatients[id];

  if (!extendedPatients[id]) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography variant="body1">gender: {patient.gender}</Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      {patient.entries.length > 0 && (
        <Typography variant="h5">entries</Typography>
      )}
      {patient.entries.map((entry) => (
        <EntryType key={entry.id} entry={entry} />
      ))}
    </Container>
  );
};

export default PatientPage;
