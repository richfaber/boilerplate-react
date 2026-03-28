import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'

import './App.scss'

import Router from '@/router'
import { I18nProvider } from '@/context/I18nContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <I18nProvider>

          <AuthProvider>
            <Router />
          </AuthProvider>

        </I18nProvider>

      </BrowserRouter>
    </>
  )

}

export default App
