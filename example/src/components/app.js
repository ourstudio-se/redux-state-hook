import React from "react";

import TodoList from "./todo-list";
import TodoItem from "./todo-item";


const App = () => (
    <div style={{ margin: "10px auto", padding: "10px", width: "80%"}}>
        <h2 style={{ borderBottom: "1px solid black"}}>Todo list</h2>
        <TodoList />
        <TodoItem />
    </div>
);
export default App;
