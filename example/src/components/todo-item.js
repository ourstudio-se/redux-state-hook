import React from "react";
import { bindActionCreators } from "redux";
import { createSelector } from "reselect";

import useReduxState from "redux-state-hook";

import { remove, resolve, show } from "../redux/todos-actions";


const activeTodoSelector = createSelector(
    state => state.todos.todos,
    state => state.todos.active,
    (todos, active) => todos[active]
);

export default () => {
    const [ todo, dispatch ] = useReduxState(activeTodoSelector);

    const actions = bindActionCreators({
        remove,
        resolve,
        show,
    }, dispatch);

    if (!todo)
        return null;

    return (
        <div style={{ position: "fixed", top: "25%", right: "25%", bottom: "25%", left: "25%", backgroundColor: "white", border: "2px solid grey", padding: "10px" }}>
            <span style={{ float: "right" }} onClick={() => actions.show(null)}>x</span>

            <div style={{ padding: "10px" }}>
                <h2 style={{ borderBottom: "1px solid black" }}>{todo.title}</h2>
            </div>

            <p style={{ padding: "10px" }}>{todo.message}</p>

            <button style={{ float: "left" }} onClick={() => actions.resolve(todo.id)}>Resolved</button>
            <button style={{ float: "right" }} onClick={() => actions.remove(todo.id)}>Remove</button>
        </div>
    );
};
