import {useMemo, useReducer} from "react";
import {TodoApp} from "./TodoApp.tsx";
import reducer, {TodoState, TodoStatus} from "./logic/reducer.ts";
import {DispatchContext, StateContext} from "./logic/context.ts";
import {createActionOrThunkDispatch} from "../simple-redux/simple-redux.ts";

const defaultState: TodoState = {
    todos: [
        {
            id: "0",
            title: "mow the lawn",
            status: TodoStatus.Complete
        },
        {
            id: "1",
            title: "feed the dog",
            status: TodoStatus.Incomplete
        }
    ]
};

export function TodoAppCreator() {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const thunkDispatch = useMemo(() => createActionOrThunkDispatch(dispatch), [dispatch]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={thunkDispatch}>
                <TodoApp/>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
