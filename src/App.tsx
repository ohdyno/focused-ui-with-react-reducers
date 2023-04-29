import {PropsWithChildren, Reducer, useReducer} from 'react'
import './App.css'

type Action =
    | { type: 'increment counter' }

type AppState = {
    count: number
}
const defaultState: AppState = {count: 0};

type AppProps = PropsWithChildren<{
    initialState?: AppState,
    reducer?: AppReducer
}>

type AppReducer = Reducer<AppState, Action>

function defaultReducer(state: AppState, action: Action) {
    switch (action.type) {
        case "increment counter":
            return {...state, count: state.count + 1};
        default:
            return state
    }
}

function App(props: AppProps) {
    const initialState = props.initialState ?? defaultState
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
