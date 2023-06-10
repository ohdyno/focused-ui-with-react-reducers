import {TodoApp} from "./TodoApp.tsx";
import {DispatchContext, StateContext} from "./logic/context.ts";
import {useStore} from "./logic/store.ts";

export function TodoAppCreator() {
    const state = useStore(store => store.state)
    const dispatch = useStore(store => store.dispatch)

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <TodoApp/>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
