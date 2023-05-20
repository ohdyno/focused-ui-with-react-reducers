import {useMemo, useReducer} from "react";
import {defaultState} from "./store/TodoStore.ts";
import {TodoApp} from "./TodoApp.tsx";
import reducer from "./store/TodoReducer.ts";
import {Store} from "./store/TodoStoreComponent.tsx";
import {createActionOrThunkDispatch} from "../simple-redux/simple-redux.ts";

export function TodoAppCreator() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const thunkDispatch = useMemo(() => createActionOrThunkDispatch(dispatch), [dispatch]);

    return (
        <Store state={state} dispatch={thunkDispatch}>
            <TodoApp/>
        </Store>
    )
}
