import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./assets/reset.css"
import "./assets/main.css"
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
  <App />
</QueryClientProvider>
)
