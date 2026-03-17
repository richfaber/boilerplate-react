import { Outlet } from 'react-router-dom'
import "./_Default.scss"

export default function Default() {

  return (<>
    <div data-layout="default">
      <Outlet />
    </div>
  </>)

}