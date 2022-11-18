import { Route, Routes } from 'react-router-dom'
import { Login } from '../screens/Login'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}