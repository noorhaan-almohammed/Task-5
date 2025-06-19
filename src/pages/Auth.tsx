import { Outlet } from 'react-router-dom'
import '../css/global.css'
function Auth() {
  return (
    <div className="authBackground">
        <Outlet />
    </div>
  )
}

export default Auth
