import './App.css'
import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import { GoogleOAuthProvider } from '@react-oauth/google';


function Logout(){
  localStorage.clear()
  return <Navigate t0="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}


function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/reset-password-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}
export default App;
