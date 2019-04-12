import {
    ADD,
    RESOLVE,
    REMOVE,
    SHOW,
} from "./todos-actions";


const initialState = {
    todos: {},
    active: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todo.id]: action.todo,
                },
            };
        case RESOLVE:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todo.id]: {
                        ...state.todos[action.todo.id],
                        resolved: true,
                    },
                },
            };
        case REMOVE:
            const nextState = { ...state, todos: { ...state.todos} };
            delete nextState.todos[action.todo.id];

            if (nextState.active === action.todo.id)
                nextState.active = null;

            return nextState;
        case SHOW:
            return {
                ...state,
                active: action.todo.id
            };
        default:
            return state;
    }
};
