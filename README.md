[![build status](https://travis-ci.org/ourstudio-se/redux-state-hook.svg?branch=master)](https://travis-ci.org/ourstudio-se/redux-state-hook.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ourstudio-se/redux-state-hook/badge.svg?branch=feature%2Fcoveralls)](https://coveralls.io/github/ourstudio-se/redux-state-hook?branch=feature%2Fcoveralls)
[![npm version](https://badge.fury.io/js/redux-state-hook.svg)](https://badge.fury.io/js/redux-state-hook)

# redux-state-hook

A lightweight React hook to consume Redux state

## Installation

Add it as a dependency to your `package.json` with

    npm i --save redux-state-hook

or

    yarn add redux-state-hook

## Introduction

`redux-state-hook` requires React (v16.8.0+) and Redux (v3.0.0+). It is a non-invasive library, and aims to replace the use of [React-Redux](https://github.com/reduxjs/react-redux) by providing a React hook instead of connected components - but it can be used alongside React-Redux without any problem.

To minimize component re-rendering, it's adviced to use a helper package when selecting state values, such as [reselect](https://github.com/reduxjs/reselect).

## API

### `<Provider store={reduxStore}>`

The `Provider`-component manages the Redux store in it's own context. This component needs to be available in the component tree, to let `useReduxState` reach the actual Redux store.

### `useReduxState(selectorFn = null)`

The hook itself takes an optional `selectorFn` which is a utility function to select a part of the Redux state tree. When selecting simple values such as numbers, strings, plain arrays or non-nested objects, `useReduxState` utilizes a shallow compare to reduce the number of component renders. For more complex data structures, a `reselect` selector can be used effectivly.

`useReduxState` returns a value pair, where the first value is the selected partial state, and the second value is the `dispatch` function from Redux. This function should be used to dispatch actions.

The `selectorFn` is an optional parameter, and when it's omitted the hook always returns a `null` value for the partial state return. This is useful when a component only need access to the `dispatch` function without caring about any state or state changes.

## Example

There's a runnable, full scale, example available in the [example directory](https://github.com/ourstudio-se/redux-state-hook/tree/master/example).

## Usage

app.js
```javascript
import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "redux-state-hook";

const counter = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREASE": return { ...state, count: state.count + 1 };
        case "DECREASE": return { ...state, count: state.count - 1 };
        default: return state;
    }
};

const reducers = combineReducers({
    counter,
    ...
})
const store = createStore(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app-root");
);
```

another-component.js
```javascript
import React from "react";
import { createSelector } from "reselect";
import useReduxState from "redux-state-hook";

const countSelector = createSelector(
    state => state.counter.count,
    count => count
);

export const AnotherComponent = () => {
    const [ count, dispatch ] = useReduxState(countSelector);

    return (
        <>
            <span>Current count is <strong>{count}</strong></span>
            <div>
                <button onClick={() => dispatch({ type: "INCREASE" })}>Increase</button>
                <button onClick={() => dispatch({ type: "DECREASE" })}>Decrease</button>
            </div>
        </>
    );
};
```
