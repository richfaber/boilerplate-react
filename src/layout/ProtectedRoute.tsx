import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '@/hook/useAuth'

export default function ProtectedRoute() {
  
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>인증 정보 확인 중...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return <Outlet />
}