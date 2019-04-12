import React from "react";

import useReduxState from "redux-state-hook";


const logSelector = state => state.log.logs.slice().reverse();

export default () => {
    const [ logs ] = useReduxState(logSelector);

    return (
        <pre style={{ width: "100%", maxHeight: "100px", overflow: "scroll" }}>
            {logs.map(log => `${log}\n`)}
        </pre>
    );
};
