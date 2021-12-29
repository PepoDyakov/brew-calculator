import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./App";
import FancyAFRouter from "./routing";

ReactDOM.render(
  <React.StrictMode>
    <FancyAFRouter>
      <App />
    </FancyAFRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
