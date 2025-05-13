import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { initAxios } from './api/services/axios.service.ts'
import { GlobalProvider } from './context/global.context.tsx'
import { AppRoutes } from './AppRoutes.tsx'
import App from './App.tsx'
import './index.css'

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
