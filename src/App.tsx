import {PropsWithChildren, useReducer} from 'react'
import './App.css'
import {Action, Actions, AppReducer, appReducer, AppState, defaultState} from "./AppReducer.ts";
import createThunkDispatch, {ThunkDispatch} from "./createThunkDispatch.ts";

type TestOnlyProps = {
    dispatch?: ThunkDispatch<Action>
}

type AppProps = PropsWithChildren<{
    initialState?: AppState,
    reducer?: AppReducer,
}> & TestOnlyProps


function App(props: AppProps) {
    const initialState = props.initialState ?? defaultState
    const reducer = props.reducer ?? appReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    let dispatchWithThunk = createThunkDispatch(dispatch)

    if (props.dispatch) {
        dispatchWithThunk = props.dispatch
    }

    return (
        <>
            <div className="card">
                <button onClick={() => dispatchWithThunk(Actions.increment())}>
                    count is {state.count}
                </button>
            </div>
        </>
    )
}

export default App
