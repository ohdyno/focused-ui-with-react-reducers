import {Dispatch, Reducer} from "react";

type Dispatchable = {
    dispatch: Dispatch<Action>
}

export type Action =
    | { type: 'increment' } & Dispatchable
    | { type: "increment failure" }
    | { type: "increment success", count: number }

export type AppState = {
    count: number
}

export type AppReducer = Reducer<AppState, Action>

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'increment':
            fetch(`https://example.com/api/increment/${state.count}`)
                .then((response) => {
                    if (response.ok) {
                        action.dispatch({type: "increment success", count: state.count});
                    } else {
                        action.dispatch({type: "increment failure"});
                    }
                })
            return state
        case "increment success":
            return {...state, count: action.count + 1}
        default:
            return state
    }
}

export const defaultState: AppState = {count: 0};
