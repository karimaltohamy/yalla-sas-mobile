import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import i18n from "./i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "aos/dist/aos.css";

import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import store from "./redux/strore.js";
import "./utils/interceptors.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
