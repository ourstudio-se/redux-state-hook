import React from "react";
import { render } from "react-dom";
import { Provider } from "redux-state-hook";

import store from "./redux/store";
import App from "./components/app";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app-root")
);
