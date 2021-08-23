import { render } from "./MyComponentFramework";
import {Container} from "./Main";

function App() {
    const root = document.getElementById("root");
    if (root) {
      render(Container(), root);
    }
  }

  const app = App();