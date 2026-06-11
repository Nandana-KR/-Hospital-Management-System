import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientDetail from './pages/PatientDetail'

function ProtectedRoute({ children }) {
    const { token } = useAuth()
    if (!token) {
        return <Navigate to="/login" />
    }
    return children
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/patients"
                        element={
                            <ProtectedRoute>
                                <PatientList />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route
                      path="/patients/:id"
                      element={
                          <ProtectedRoute>
                              <PatientDetail />
                          </ProtectedRoute>
                      }
                  />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App