import './App.css'
import { Routes,Route,Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute'
// import Home from './components/Home'
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import { ACCESS_TOKEN } from './constants';

function Logout(){
  localStorage.clear()      
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}


function App() {
  const cliendID=import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={cliendID}>
      <Routes>
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />

        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/reset-password-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

       
        {/* Redirect to /app if logged in */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/app" /> : <Login />} />

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}
export default App;
