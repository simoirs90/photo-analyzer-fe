import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/login/LoginPage'
import { Dashboard } from './pages/dashboard/Dashboard'
import { ProtectedRoute } from './route/ProtectedRoute'
import { RegisterPage } from './pages/register/RegisterPage'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Dashboard />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/home" replace />} />
        
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
