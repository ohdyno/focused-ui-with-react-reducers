import {createContext} from "react";
import {TodoState} from "./reducer.ts";
import {TodoAction} from "./actions.ts";
import {ThunkDispatch} from "../../simple-redux/simple-redux.ts";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const StateContext = createContext<TodoState>(null!)
export const DispatchContext = createContext<ThunkDispatch<TodoAction>>(null!)
/* eslint-enable */
