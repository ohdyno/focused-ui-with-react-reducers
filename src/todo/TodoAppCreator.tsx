import {useMemo, useReducer} from "react";
import {defaultState} from "./TodoStore.ts";
import {TodoApp} from "./TodoApp.tsx";
import reducer from "./TodoReducer.ts";
import {createActionOrThunkDispatch} from "./TodoThunks.ts";
import {Store} from "./TodoStoreComponent.tsx";

export function TodoAppCreator() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const thunkDispatch = useMemo(() => createActionOrThunkDispatch(dispatch), [dispatch]);

    return (
        <Store state={state} dispatch={thunkDispatch}>
            <TodoApp/>
        </Store>
    )
}
