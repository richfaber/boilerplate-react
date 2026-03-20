import { useState, useEffect } from 'react'

export async function signIn() {

  const token = 'testToken'

  localStorage.setItem('accessToken', token)
  return Promise.resolve(token)

}

export async function signOut() {

  localStorage.removeItem('accessToken')  
  return Promise.resolve(true)

}

export function getToken() {
  return Promise.resolve(localStorage.getItem('accessToken'))
}

export async function isAuthenticated() {
  return !!(await getToken())
}

export default function useAuth() {

  const [auth, setAuth] = useState({ isAuthenticated: false, isLoading: true })

  useEffect(() => {
    
    async function checkToken() {

      const token = await getToken()
      setAuth({ isAuthenticated: !!token, isLoading: false })

    }

    checkToken()

  }, [])

  return auth

}