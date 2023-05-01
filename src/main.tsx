import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {rest, setupWorker} from "msw";

const handlers = [
    rest.all(/.*/, (_, res, ctx) => res(ctx.status(200)))
];
const worker = setupWorker(...handlers)

await worker.start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
