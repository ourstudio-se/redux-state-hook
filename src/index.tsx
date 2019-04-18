import * as React from "react";
import { Store, AnyAction } from "redux";

import { isEqual } from "./equality";

export const ReduxStateContext: React.Context<Store> = React.createContext<
    Store | any
>(null);

interface IProviderProps {
    children: React.ReactNode;
    store: Store;
}

export const Provider = ({ children, store }: IProviderProps) => (
    <ReduxStateContext.Provider value={store}>
        {children}
    </ReduxStateContext.Provider>
);

type ReduxStateSelector<TState, TSelected> = (state: TState) => TSelected;

export const useReduxState = <TState, TSelected>(
    selector: ReduxStateSelector<TState, TSelected> | null = null
): [TSelected | null, React.Dispatch<AnyAction>] => {
    const { dispatch, getState, subscribe } = React.useContext(
        ReduxStateContext
    );

    if (!selector) return [null, dispatch];

    const [localState, setLocalState] = React.useState(() =>
        selector(getState())
    );
    const stateRef = React.useRef<TSelected>();
    stateRef.current = localState;

    React.useEffect(
        () =>
            subscribe(() => {
                const nextState = selector(getState());
                if (!isEqual(stateRef.current, nextState)) {
                    setLocalState(nextState);
                }
            }),
        []
    );

    return [localState, dispatch];
};
export default useReduxState;
