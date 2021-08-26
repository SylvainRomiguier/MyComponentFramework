import { Button } from "./Button";
import { LabelValue } from "./LabelValue";
import { v4 as uuid } from "uuid";
import { h } from "./MyComponentFramework";
import { MyStateHandler } from "./MyComponentFramework";
import { AutoCounter } from "./AutoCounter";

export const Container = () => (
  <div style="display: flex; flex-direction: column; width: 325px; margin-left: auto; margin-right: auto; height: 500px; border: 1px solid grey; border-radius: 15px; padding: 20px;">
    <AutoCounter count={10} />
    <CountAndFruit count={1} fruit="Apple" />
  </div>
);

interface CountAndFruitState {
  count: number;
  fruit: "Apple" | "Pear" | "Cherry";
}

const CountAndFruit = ({
  count: _count,
  fruit: _fruit,
}: CountAndFruitState) => {
  const guid = uuid();

  const [getCount, setCount] = MyStateHandler.useState<number>(_count);
  const [getFruit, setFruit] = MyStateHandler.useState<
    "Apple" | "Pear" | "Cherry"
  >(_fruit);

  console.log(getFruit());

  const clickAdd = () => {
    console.log("clickAdd");
    setCount(getCount() + 1);
  };
  const clickSub = () => {
    console.log("clickSub");
    setCount(getCount() - 1);
  };

  return (
    <div id={guid} style="display: flex; flex-direction: column;">
      <LabelValue label="Count" value={getCount().toString()} />
      <div style="display: flex; justify-content: space-around; padding: 20px;">
        <Button label="Increase amount" onClick={clickAdd} />
        <Button label="Decrease amount" onClick={clickSub} />
      </div>
      <LabelValue label="Fruit" value={getFruit()} />
      <div style="display: flex; justify-content: space-around; padding: 20px;">
        <Button label="Set Apple" onClick={() => setFruit("Apple")} />
        <Button label="Set Cherry" onClick={() => setFruit("Cherry")} />
        <Button label="Set Pear" onClick={() => setFruit("Pear")} />
      </div>
    </div>
  );
};
