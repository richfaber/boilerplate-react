import { Outlet } from 'react-router-dom'
import style from "./Default.module.scss"

export default function Default() {

  return (<>
    <div className={style.default}>
      <Outlet />
    </div>
  </>)

}