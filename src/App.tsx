import {Dispatch, PropsWithChildren} from 'react'
import './App.css'
import {Action, Actions, AppReducer, appReducer, AppState, defaultState, Thunk} from "./AppReducer.ts";
import useThunkReducer from "./hooks/useThunkReducer.ts";

type TestOnlyProps = {
    dispatch?: Dispatch<Action | Thunk>
}

type AppProps = PropsWithChildren<{
    initialState?: AppState,
    reducer?: AppReducer,
}> & TestOnlyProps



function App(props: AppProps) {
    const initialState = props.initialState ?? defaultState
    const reducer = props.reducer ?? appReducer
    let [state, dispatch] = useThunkReducer(reducer, initialState)
    if (props.dispatch) {
        dispatch = props.dispatch
        state = initialState
    }

    return (
        <>
            <div className="card">
                <button onClick={() => dispatch(Actions.increment())}>
                    count is {state.count}
                </button>
            </div>
        </>
    )
}

export default App
