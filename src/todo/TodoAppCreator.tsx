import {TodoApp, StateContext, DispatchContext} from "./TodoApp.tsx";
import {useStoreDispatch, useStoreState} from "./logic/store.ts";

export function TodoAppCreator() {
    const state = useStoreState()
    const dispatch = useStoreDispatch()

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <TodoApp/>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
