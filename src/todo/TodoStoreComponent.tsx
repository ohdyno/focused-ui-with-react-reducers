import {PropsWithChildren} from "react";
import {defaultDispatch, defaultState, StoreDispatch, StoreState, TodoStore} from "./TodoStore.ts";

export function Store({state = defaultState, dispatch = defaultDispatch, children}: PropsWithChildren<Partial<TodoStore>>) {
    return (
        <StoreState.Provider value={state}>
            <StoreDispatch.Provider value={dispatch}>
                {children}
            </StoreDispatch.Provider>
        </StoreState.Provider>
    )
}
