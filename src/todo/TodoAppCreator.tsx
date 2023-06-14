import {TodoApp} from "./TodoApp.tsx";
import {DispatchContext, StateContext} from "./logic/context.ts";
import {store} from "./logic/store.ts";
import {useStore} from "zustand";

export function TodoAppCreator() {
    const state = useStore(store, store => store.state)
    const dispatch = useStore(store, store => store.dispatch)

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <TodoApp/>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
