import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Context/SocketProvider.jsx'
import { UserProvider } from './Context/UserProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SocketProvider>
      <UserProvider>
    <App />
    </UserProvider>
    </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
