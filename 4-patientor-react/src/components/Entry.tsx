import { Container, Typography } from "@material-ui/core";
import { useStateValue } from "../state";
import { Entry as EntryType } from "../types";

interface Props {
  entry: EntryType;
}

const Entry = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div style={{ border: "1px blue solid", margin: "1rem", padding: "1rem" }}>
      <Typography variant="body1">
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((item) => item.code === code)?.name}
          </li>
        ))}
      </ul>
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default Entry;
