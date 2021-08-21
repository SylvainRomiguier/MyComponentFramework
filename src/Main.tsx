import { Button } from "./Button";
import { LabelValue } from "./LabelValue";
import { v4 as uuid } from "uuid";
import { createElement, Listener, useState } from "./MyComponentFramework";
import { AutoCounter } from "./AutoCounter";

function App() {
  const root = document.getElementById("root");
  if (root) {
    root.appendChild(Container());
  }
}

const Container = () => (
  <div style="display: flex; flex-direction: column; width: 325px; margin-left: auto; margin-right: auto; height: 500px; border: 1px solid grey; border-radius: 15px; padding: 20px;">
    <AutoCounter />
    <CountAndFruit />
  </div>
);

interface CountAndFruitState {
  count: number;
  fruit: "Apple" | "Pear" | "Cherry";
}

const initialValues: CountAndFruitState = {
  count: 1,
  fruit: "Apple",
};

const CountAndFruit = () => {
  const guid = uuid();

  const render: Listener<CountAndFruitState> = (newState) => {
    const rendered = (
      <div id={guid} style="display: flex; flex-direction: column;">
        <LabelValue label="Count" value={newState.count.toString()} />
        <div style="display: flex; justify-content: space-around; padding: 20px;">
          <Button label="Increase amount" onClick={() => clickAdd(newState)} />
          <Button label="Decrease amount" onClick={() => clickSub(newState)} />
        </div>
        <LabelValue label="Fruit" value={newState.fruit} />
        <div style="display: flex; justify-content: space-around; padding: 20px;">
          <Button
            label="Set Apple"
            onClick={() => setFruit(newState, "Apple")}
          />
          <Button
            label="Set Cherry"
            onClick={() => setFruit(newState, "Cherry")}
          />
          <Button label="Set Pear" onClick={() => setFruit(newState, "Pear")} />
        </div>
      </div>
    );

    const previousRendered = document.getElementById(guid);
    if (previousRendered) {
      previousRendered.replaceWith(rendered);
      return;
    }
    return rendered;
  };

  const [subscribe, setState] = useState<CountAndFruitState>();
  subscribe(render);

  const clickAdd = (newState: CountAndFruitState) => {
    setState({ ...newState, count: newState.count + 1 });
  };
  const clickSub = (newState: CountAndFruitState) => {
    setState({ ...newState, count: newState.count - 1 });
  };

  const setFruit = (
    newState: CountAndFruitState,
    fruit: "Apple" | "Pear" | "Cherry"
  ) => {
    setState({ ...newState, fruit });
  };

  return render(initialValues);
};

const app = App();
