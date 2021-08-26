import { h, MyStateHandler } from "./MyComponentFramework";
import { LabelValue } from "./LabelValue";

let interval: number | null = null;

export const AutoCounter = ({ count }: { count: number }) => {
  const [getCount, setCount] = MyStateHandler.useState<number>(count);
  if(interval) clearInterval(interval);
  interval = setInterval(() => setCount(getCount() + 1), 1000);
  return <LabelValue label="auto-counter" value={getCount().toString()} />;
};
