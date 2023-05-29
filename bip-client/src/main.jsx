import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import './i18n/i18n.js'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>loading</div>}>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Suspense>
)
