import { v4 as uuid } from "uuid";
import { h } from "./MyComponentFramework";

interface LabelValueProps {
  label: string;
  value: string;
}
export const LabelValue = ({ label, value }: LabelValueProps) => {
  const guid = uuid();

  return (
    <div id={guid} style="display: flex;">
      <div style="font-weight: bold; margin-right: 5px;">{label}&nbsp;:</div>
      <div>{value}</div>
    </div>
  );
};
