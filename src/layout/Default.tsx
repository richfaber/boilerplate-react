import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import style from "./Default.module.scss"

import useAuth, { signOut } from '@/hook/useAuth'

export default function Default() {

  const { isAuthenticated, isLoading } = useAuth()

  const navigate = useNavigate()

  async function handleSignOut(e) {

    await signOut()
    return navigate('/Login')

  }

  return (<>

    <button type="button" onClick={handleSignOut} style={{ display: isAuthenticated ? 'block' : 'none' }}>로그아웃</button>
    <div className={style.default}>
      <Outlet />
    </div>
  </>)

}