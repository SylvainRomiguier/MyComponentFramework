import { v4 as uuid } from "uuid";
import { h } from "./MyComponentFramework";

interface ButtonProps {
  label: string;
  onClick: () => void;
}
export const Button = ({ label, onClick }: ButtonProps) => {
  const guid = uuid();

  return <button id={guid} onClick={onClick} style="cursor: pointer;">{label}</button>;
};
