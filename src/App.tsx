import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Default from '@/layout/Default'

const Home = lazy( () => import('@/page/Home') )

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Default /> }>
            <Route path="/Home" element={ <Home /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
