import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores/auth';


export function PublicGuard() {
  const token = authStore((state)=>state.token)

    if (token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet/>;
}
