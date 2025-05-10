import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAxios } from './api/services/axios.service.ts'
import { GlobalProvider } from './context/global.context.tsx'
import { AppRoutes } from './AppRoutes.tsx'

initAxios();
createRoot(document.getElementById('root')!).render(
  /* Recorda colocala el  StrictMode*/
  <>
    <BrowserRouter>
      <GlobalProvider>
        <App>
          <AppRoutes />
        </App>
      </GlobalProvider>
    </BrowserRouter>
  </>,
)
