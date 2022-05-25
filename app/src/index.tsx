import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Wallet } from "./components/Wallet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wallet>
      <App />
    </Wallet>
  </React.StrictMode>
);
