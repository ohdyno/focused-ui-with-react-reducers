import {LoadTodosAction, TodoAction} from "./TodoActions.ts";
import {TodoItem} from "./TodoReducer.ts";
import {Thunk as ReduxThunk} from "../../simple-redux/simple-redux.ts";

type Thunk = ReduxThunk<TodoAction>
export const LoadTodosThunk: Thunk = (dispatch) => {
    fetch("https://xingzhou.me/stub-apis/todos")
        .then((response) => response.json())
        .then((todos: TodoItem[]) => {
            dispatch(LoadTodosAction(todos))
        })
}
