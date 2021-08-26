import { App } from "./App";

export type Listener<EventType> = (event: EventType) => any;

export function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType): void => {
      listeners.forEach((l) => l(event));
    },
  };
}

const appendChild = (parent: HTMLElement, child: Node[] | Node) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  else {
    if (typeof child === "string") {
      parent.appendChild(document.createTextNode(child));
    } else {
      parent.appendChild(child);
    }
  }
};

export const createElement = (node: VirtualNode): Text | HTMLElement => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.type);
  setProps(element, node.props);

  node.children.map(createElement).forEach(element.appendChild.bind(element));

  return element;
};

const setProp = (target: HTMLElement, name: string, value: string) => {
  if (
    name.startsWith("on") &&
    name.toLowerCase() in window &&
    typeof value === "function"
  ) {
    target.addEventListener(name.toLowerCase().substr(2), value);
  } else {
    target.setAttribute(name, (value as number | string).toString());
  }
};

const setProps = (target: HTMLElement, props: Props) => {
  Object.entries(props || {}).forEach(([name, value]) => {
    setProp(target, name, value as string);
  });
};

const flatten = (arr: any[]): any[] => [].concat.apply([], arr);

type Props =
  | Record<string, string | number | ((event: Event) => void)>
  | {}
  | null;

export const h = (
  type: string | ((props: Props, children: Node[]) => Node),
  props: Props,
  ...children: Node[]
) => {
  props = props || {};
  if (typeof type === "function") return type(props, flatten(children));
  return { type, props, children: flatten(children) };
};

const changed = (newNode: Node, oldNode: Node) => {
  return true;
};

const diffProps = (newNode: Node, oldNode: Node) => {};

const diffChildren = (newNode: Node, oldNode: Node) => {};

interface Patch {
  type: "CREATE" | "UPDATE" | "REPLACE" | "REMOVE";
  newNode?: Node;
}

const diff = (newNode: Node, oldNode: Node): Patch => {
  if (!oldNode) {
    return { type: "CREATE", newNode };
  }
  if (!newNode) {
    return { type: "REMOVE" };
  }
  if (changed(newNode, oldNode)) {
    return { type: "REPLACE", newNode };
  }
  return { type: "UPDATE" };
};

const patch = (parent: Node, patches: any, index: number = 0) => {
  if (!patches) {
    return;
  }
  const el = parent.childNodes[index];
  switch (patches.type) {
    case "CREATE": {
      const { newNode } = patches;
      const newEl = createElement(newNode);
      return parent.appendChild(newEl);
    }
    case "REMOVE": {
      return parent.removeChild(el);
    }
    case "REPLACE": {
    }
    case "UPDATE": {
    }
    default:
      throw new Error("Unknown patch type");
  }
};

export const MyStateHandler = (function (Component) {
  let hooks: any[] = [];
  let idx = 0;

  const useState = <StateType>(
    initialValue: StateType
  ): [() => StateType, (newStateValue: StateType) => void] => {
    const _idx = idx;
    const getState = () => hooks[_idx] || initialValue;
    const setState = (newStateValue: StateType) => {
      hooks[_idx] = newStateValue;
      idx = 0;
      App();
    };
    idx++;
    return [getState, setState];
  };

  return { useState };
})(App);

interface VirtualNode {
  type: string;
  props: Props;
  children: VirtualNode[];
}

export const render = (virtualNode: VirtualNode, root: Node) => {
  console.log(virtualNode);
  if (root.firstChild) {
    root.replaceChild(createElement(virtualNode), root.firstChild);
  } else {
    root.appendChild(createElement(virtualNode));
  }
};
