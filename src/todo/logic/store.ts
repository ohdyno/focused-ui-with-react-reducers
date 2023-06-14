import reducer, {TodoState, TodoStatus} from "./reducer.ts";
import {createStore} from "../../lib/store.ts";

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

export const store = createStore(reducer, defaultState)
