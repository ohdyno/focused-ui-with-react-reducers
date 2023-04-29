import {PropsWithChildren, Reducer, useReducer} from 'react'
import './App.css'

export type Action =
    | { type: 'increment counter' }

type AppState = {
    count: number
}

export type AppReducer = Reducer<AppState, Action>

type AppProps = PropsWithChildren<{
    initialState?: AppState,
    reducer?: AppReducer
}>

function defaultReducer(state: AppState, action: Action) {
    switch (action.type) {
        case "increment counter":
            return {...state, count: state.count + 1};
        default:
            return state
    }
}

function App(props: AppProps) {
    const initialState = props.initialState ?? {count: 0}
    const reducer = props.reducer ?? defaultReducer
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <div className="card">
                <button onClick={() => dispatch({type: 'increment counter'})}>
                    count is {state.count}
                </button>
            </div>
        </>
    )
}

export default App
