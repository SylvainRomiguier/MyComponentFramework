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

export const createElement = (
  tag: string | ((props: Props, children: Node | Node[] | string) => Node),
  props: Props,
  ...children: Node[]
) => {
  if (typeof tag === "function") return tag(props, children);
  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (
      name.startsWith("on") &&
      name.toLowerCase() in window &&
      typeof value === "function"
    )
      element.addEventListener(name.toLowerCase().substr(2), value);
    else element.setAttribute(name, value.toString());
  });

  appendChild(element, children);

  return element;
};

type Props = Record<string, string | number | ((event: Event) => void)>;

export const useState = <StateType>(): [
  (listener: Listener<StateType>) => () => void,
  (newStateValue: StateType) => void
] => {
  const observer = createObserver<StateType>();
  const subscribe = observer.subscribe;
  const setState = (newStateValue: StateType) => {
    observer.publish(newStateValue);
  };
  return [subscribe, setState];
};
