import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const Navigate = useNavigate();
  return (
    <Button type="back" onClick={() => Navigate("/app/cities")}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
