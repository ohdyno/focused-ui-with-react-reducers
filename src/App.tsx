import {PropsWithChildren, useState} from 'react'
import './App.css'

type AppState = {
    count: number
}

type AppProps = PropsWithChildren<{
    initialState?: AppState
}>

function App(props: AppProps) {
    const initialState = props.initialState ?? {count: 0}
    const [state] = useState(initialState)

    return (
        <>
            <div className="card">
                <button onClick={() => {/**/
                }}>
                    count is {state.count}
                </button>
            </div>
        </>
    )
}

export default App
