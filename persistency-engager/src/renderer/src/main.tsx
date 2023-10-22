import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css'
import Activities from './features/activities/Activities'

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />
  },
  {
    path: '/',
    element: <Activities />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)