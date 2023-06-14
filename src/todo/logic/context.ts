import {createContext} from "react";
import {TodoState} from "./reducer.ts";
import {TodoAction} from "./actions.ts";
import {ThunkDispatch} from "../../lib/thunk-dispatch.ts";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const StateContext = createContext<TodoState>(null!)
export const DispatchContext = createContext<ThunkDispatch<TodoState, TodoAction>>(null!)
/* eslint-enable */
