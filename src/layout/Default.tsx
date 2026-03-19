import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import style from "./Default.module.scss"

export default function Default() {

  function handleSignOut(e) {

    localStorage.removeItem('accessToken')
    setIsLogin(false)
    navigate('/Login')

  }

  let [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'))
  const navigate = useNavigate()

  return (<>

    <button type="button" onClick={handleSignOut} style={{ display: isLogin ? 'block' : 'none' }}>로그아웃</button>
    <div className={style.default}>
      <Outlet />
    </div>
  </>)

}