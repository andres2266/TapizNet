import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores/auth';

export function PrivateGuard() {
  const token = authStore((state)=>state.token)

  if(!token){
    return <Navigate to="/login" replace />
  }
  return <Outlet/>
}
