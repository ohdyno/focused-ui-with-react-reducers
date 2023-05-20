import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {TodoAppCreator} from "./todo/TodoAppCreator.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoAppCreator />
  </React.StrictMode>,
)
