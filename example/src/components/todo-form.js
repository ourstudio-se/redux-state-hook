import React, { useState } from "react";
import { bindActionCreators } from "redux";

import useReduxState from "redux-state-hook";

import { add } from "../redux/todos-actions";


export default () => {
    const [ _, dispatch ] = useReduxState();
    const actions = bindActionCreators({
        add,
    }, dispatch);

    const [ title, setTitle ] = useState("");
    const [ message, setMessage ] = useState("");

    const disabled = !title || !message;

    const create = () => {
        actions.add(title, message);
        setTitle("");
        setMessage("");
    };

    return (
        <>
            <div>
                <input
                    style={{ padding: "10px" }}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.currentTarget.value)}
                />
            </div>
            <div>
                <textarea
                    style={{ width: "100%", height: "100px", padding: "10px" }}
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                ></textarea>
            </div>
            <button disabled={disabled} onClick={create}>Create</button>
        </>
    );
};
