import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth()

  return user.token ? <AppRoutes /> : <AuthRoutes />
}