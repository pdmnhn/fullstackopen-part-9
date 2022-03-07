import { CoursePart } from "../utils/types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </>
  );
};

export default Content;
