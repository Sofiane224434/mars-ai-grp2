// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
function App() {
  const { loading } = useAuth();
  if (loading) return <div><p>Chargement...</p></div>;
  return (
    <Routes>
    {/* Routes AVEC Header + Footer */}
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <PrivateRoute><Dashboard /></PrivateRoute>
        } />
      </Route>
      {/* Routes SANS Header (plein écran) */}
      <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;