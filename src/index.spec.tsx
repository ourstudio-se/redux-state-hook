import * as React from "react";
import { renderHook, act } from "react-hooks-testing-library";
import { combineReducers, createStore, Store } from "redux";

import { Provider, useReduxState } from "./index";

const ACTION_ONE = "ACTION_ONE";
const ACTION_TWO = "ACTION_TWO";

const initialStateOne = { value: 0 };
const initialStateTwo = { value: "test" };

interface IOneState {
    value: number;
}
interface ITwoState {
    value: string;
}
interface IState {
    one: IOneState;
    two: ITwoState;
}

const getStore = () => {
    const reducers = combineReducers({
        one: (state: IOneState = initialStateOne, action): IOneState => {
            switch (action.type) {
                case ACTION_ONE:
                    return { ...state, value: action.value };
                default:
                    return state;
            }
        },
        two: (state: ITwoState = initialStateTwo, action): ITwoState => {
            switch (action.type) {
                case ACTION_TWO:
                    return { ...state, value: action.value };
                default:
                    return state;
            }
        },
    });

    return createStore(reducers);
};

describe("useReduxState", () => {
    it("returns state object and Redux dispatcher when a selector is passed in to hook", () => {
        const store = getStore();
        const selector = (tree: IState) => tree.one.value;
        const { result } = renderHook(() => useReduxState(selector), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        const [state, dispatch] = result.current;
        expect(state).not.toBe(null);
        expect(dispatch).toBe(store.dispatch);
    });
    it("returns only Redux dispatcher when no selector is passed in to hook", () => {
        const store = getStore();
        const { result } = renderHook(() => useReduxState(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        const [state, dispatch] = result.current;
        expect(state).toBe(null);
        expect(dispatch).toBe(store.dispatch);
    });
    it("returns the initial value for a reducer", () => {
        const selector = (tree: IState) => tree.one.value;
        const { result } = renderHook(() => useReduxState(selector), {
            wrapper: ({ children }) => (
                <Provider store={getStore()}>{children}</Provider>
            ),
        });

        const [state] = result.current;
        expect(state).toEqual(initialStateOne.value);
    });
    it("updates state value when dispatching action", () => {
        const store = getStore();
        const { result } = renderHook(() => useReduxState(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        const nextValue = "updated-value";
        const [_, dispatch] = result.current;
        act(() => {
            dispatch({ type: ACTION_TWO, value: nextValue });
        });

        const { two } = store.getState();
        expect(two.value).toEqual(nextValue);
    });
    it("rerenders when state value change", () => {
        const selector = (tree: IState) => tree.two.value;
        const { result } = renderHook(() => useReduxState(selector), {
            wrapper: ({ children }) => (
                <Provider store={getStore()}>{children}</Provider>
            ),
        });

        const nextValue = "updated-value";
        const [_, dispatch] = result.current;

        act(() => {
            dispatch({ type: ACTION_TWO, value: nextValue });
        });

        const [state] = result.current;
        expect(state).toEqual(nextValue);
    });
    it("Uses correct types", () => {
        const selector = (tree: IState) => tree.two.value;
        const { result } = renderHook(() => useReduxState(selector), {
            wrapper: ({ children }) => (
                <Provider store={getStore()}>{children}</Provider>
            ),
        });
        const [two, _] = result.current;

        expect(typeof two).toBe("string");
    });
});
