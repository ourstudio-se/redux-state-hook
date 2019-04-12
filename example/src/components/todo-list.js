import React from "react";
import { bindActionCreators } from "redux";
import { createSelector } from "reselect";

import useReduxState from "redux-state-hook";

import { show } from "../redux/todos-actions";
import TodoForm from "./todo-form";


const sorter = (a, b) => {
    if (a.resolved && !b.resolved)
        return 1;
    if (b.resolved && !a.resolved)
        return -1;

    return 0;
};

const todoListSelector = createSelector(
    state => Object.keys(state.todos.todos).length ? state.todos.todos : {},
    todos => Object.keys(todos).map(key => todos[key]).sort(sorter)
);

export default () => {
    const [ todos, dispatch ] = useReduxState(todoListSelector);

    const actions = bindActionCreators({
        show,
    }, dispatch);

    return (
        <>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo.id} style={{ marginBottom: "5px", paddingBottom: "5px", borderBottom: "1px solid grey" }}>
                        <span onClick={() => actions.show(todo.id)}>{todo.title}</span>
                        {todo.resolved
                            ? <span style={{ marginLeft: "25px", fontSize: "0.75em" }}>Resolved!</span>
                            : null
                        }
                    </li>
                ))}
            </ul>
            <TodoForm />
        </>
    );
};
