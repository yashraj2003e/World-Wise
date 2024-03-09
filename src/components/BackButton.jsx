import { Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const Navigate = useNavigate();
  return (
    <Button type="back" onClick={() => Navigate(-1)}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
