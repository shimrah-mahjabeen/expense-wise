import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";

import { store } from "app/store";
import App from "App";
import reportWebVitals from "reportWebVitals";

import "index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
