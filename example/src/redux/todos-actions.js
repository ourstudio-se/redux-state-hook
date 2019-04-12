const newId = () => Math.floor(Math.random() * 1000000);

export const ADD = "ADD_TODO";
export const add = (title, message) => dispatch => dispatch({ type: ADD, todo: {
    id: newId(),
    resolved: false,
    title,
    message,
}});

export const RESOLVE = "RESOLVE_TODO";
export const resolve = id => dispatch => dispatch({ type: RESOLVE, todo: {
    id,
}});

export const REMOVE = "REMOVE_TODO";
export const remove = id => dispatch => dispatch({ type: REMOVE, todo: {
    id,
}});

export const SHOW = "SHOW_TODO";
export const show = id => dispatch => dispatch({ type: SHOW, todo: {
    id,
}});
