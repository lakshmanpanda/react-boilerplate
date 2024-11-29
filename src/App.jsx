import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'  // Import the new Dashboard2 component
import { ReactRoutes } from './constants/constants'
function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path={ReactRoutes.LOGIN} element={<Login/>} />
      <Route path={ReactRoutes.DASHBOARD} element={<Dashboard/>} />
    </Routes>
</BrowserRouter>
  )
}

export default App
