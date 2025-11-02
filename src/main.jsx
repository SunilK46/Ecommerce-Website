import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './RootLayout.jsx'
import { RouterProvider } from 'react-router-dom'
import { route } from './routes/Route.jsx'
import store from './app/store/Store.jsx'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(

    <Provider store={store}><RouterProvider router={route}>
    <App />
    
    </RouterProvider></Provider>


)
