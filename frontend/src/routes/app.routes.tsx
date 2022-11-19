import { Route, Routes } from 'react-router-dom'
import { Home } from '../screens/Home'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}