import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [callStatus, setCallStatus] = useState('')

    function callAPI() {
        fetch("https://example.com/")
            .then((response) => {
                setCallStatus(response.status.toString())
            })
    }

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
            <div className="card">
                <button onClick={() => callAPI()}>
                    Call API
                </button>
                <p>{callStatus}</p>
            </div>
        </>
    )
}

export default App
