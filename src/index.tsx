import ReactDOM from "react-dom/client";
import { App } from "./app";
import "@atlaskit/css-reset";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
