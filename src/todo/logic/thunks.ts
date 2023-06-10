import {LoadTodosAction, TodoAction} from "./actions.ts";
import {TodoItem, TodoState} from "./reducer.ts";
import {Thunk as ReduxThunk} from "../../thunk-dispatch/thunk-dispatch.ts";

export type Thunk = ReduxThunk<TodoState, TodoAction>
export const LoadTodosThunk: Thunk = (dispatch) => {
    fetch("https://xingzhou.me/stub-apis/todos")
        .then((response) => response.json())
        .then((todos: TodoItem[]) => {
            dispatch(LoadTodosAction(todos))
        })
}
