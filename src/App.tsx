import {PropsWithChildren, useReducer} from 'react'
import './App.css'
import {Actions, AppReducer, appReducer, AppState, defaultState} from "./AppReducer.ts";

type AppProps = PropsWithChildren<{
    initialState?: AppState,
    reducer?: AppReducer
}>

function App(props: AppProps) {
    const initialState = props.initialState ?? defaultState
    const reducer = props.reducer ?? appReducer
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <div className="card">
                <button onClick={() => dispatch(Actions.increment(dispatch))}>
                    count is {state.count}
                </button>
            </div>
        </>
    )
}

export default App
