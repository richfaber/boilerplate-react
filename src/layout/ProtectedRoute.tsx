import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@/hook/useAuth'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if ( !isAuthenticated ) {
    return <Navigate to="/Login" replace />
  }

  return <Outlet />
}