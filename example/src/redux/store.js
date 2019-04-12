import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import todos from "./todos-reducer";
import log from "./logging-reducer";


const reducer = combineReducers({
    todos,
    log,
});

const enhancers = composeWithDevTools(
    applyMiddleware(thunk)
);

export default createStore(
    reducer,
    enhancers,
);
