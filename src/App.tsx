import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.scss'

import Router from '@/router'
import { I18nProvider } from '@/context/I18nContext'
import { ModalProvider } from '@/component/modal'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={ queryClient }>

          <I18nProvider>
            
            <ModalProvider>
          
              <AuthProvider>
                <Router />
              </AuthProvider>
  
            </ModalProvider>
 
          </I18nProvider>

        </QueryClientProvider>

      </BrowserRouter>
    </>
  )

}

export default App
