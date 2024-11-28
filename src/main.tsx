import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'material-icons/iconfont/material-icons.css';
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster></Toaster>
    <App />
  </StrictMode>,
)