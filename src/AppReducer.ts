import {Reducer} from "react";

export type Action =
    | { type: 'increment counter' }

export type AppState = {
    count: number
}

export type AppReducer = Reducer<AppState, Action>

export function appReducer(state: AppState, action: Action) {
    switch (action.type) {
        case "increment counter":
            fetch(`https://example.com/api/increment/${state.count}`)
            return {...state, count: state.count + 1};
        default:
            return state
    }
}

export const defaultState: AppState = {count: 0};
