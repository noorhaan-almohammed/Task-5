import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className="authBackground">
        <Outlet />
    </div>
  )
}

export default Auth
