import {Dispatch} from "react";
import {LoadTodosAction, TodoAction} from "./TodoActions.ts";
import {TodoItem} from "./TodoReducer.ts";

export type Thunk = (dispatch: Dispatch<TodoAction>) => void

export function isThunk(maybeThunk: unknown): maybeThunk is Thunk {
    return typeof maybeThunk === 'function'
}

export const LoadTodosThunk: Thunk = (dispatch) => {
    fetch("https://xingzhou.me/stub-apis/todos")
        .then((response) => response.json())
        .then((todos: TodoItem[]) => {
            dispatch(LoadTodosAction(todos))
        })
}

export function createActionOrThunkDispatch(dispatch: Dispatch<TodoAction>) {
    return (actionOrThunk: TodoAction | Thunk) => {
        if (isThunk(actionOrThunk)) {
            actionOrThunk(dispatch)
            return
        }
        dispatch(actionOrThunk)
    }
}

