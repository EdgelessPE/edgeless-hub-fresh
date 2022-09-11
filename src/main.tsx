import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "styles/layout.css";
import "styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

postMessage({ payload: "removeLoading" }, "*");
