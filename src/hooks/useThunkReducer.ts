import {Action, AppReducer, AppState, Thunk} from "../AppReducer.ts";
import {Dispatch, useReducer} from "react";

function isThunk(arg: Action | Thunk): arg is Thunk {
    return typeof arg === 'function';
}

export default function useThunkReducer(reducer: AppReducer, initialState: AppState): [AppState, Dispatch<Action | Thunk>] {
    const [state, dispatch] = useReducer(reducer, initialState)

    function _dispatch(arg: Action | Thunk) {
        if (isThunk(arg)) {
            arg(dispatch)
            return
        }
        dispatch(arg)
    }

    return [state, _dispatch]
}
