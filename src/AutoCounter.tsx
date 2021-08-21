import { createElement, Listener, useState } from "./MyComponentFramework";
import { v4 as uuid } from "uuid";
import { LabelValue } from "./LabelValue";

const initialValue = 0;

export const AutoCounter = () => {
  const guid = uuid();

  const render: Listener<number> = (newState) => {
    const rendered = (
      <div id={guid}>
        <LabelValue label="auto-counter" value={newState.toString()} />
      </div>
    );
    setTimeout(() => setState(newState + 1), 1000);
    const previousRendered = document.getElementById(guid);
    if (previousRendered) {
      previousRendered.replaceWith(rendered);
      return;
    }
    return rendered;
  };

  const [subscribe, setState] = useState<number>();
  subscribe(render);

  return render(initialValue);
};
