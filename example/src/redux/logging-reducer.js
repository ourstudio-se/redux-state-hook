import {
    ADD,
    RESOLVE,
    REMOVE,
    SHOW,
} from "./todos-actions";


const initialState = {
    logs: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD:
        case RESOLVE:
        case REMOVE:
        case SHOW:
            return {
                logs: state.logs.slice(0, 8).concat([ `Action "${action.type}" for todo with ID "${action.todo.id}"` ]),
            };
        default:
            return state;
    }
}
