import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import {Provider} from 'react-redux'
import {store} from "./store.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer autoClose={1000}/>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
