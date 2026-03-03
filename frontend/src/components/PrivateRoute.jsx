// components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
function PrivateRoute({ children }) {
const { isAuthenticated, loading } = useAuth();
const location = useLocation();
if (loading) {
return <div><p>Chargement...</p></div>;
}
if (!isAuthenticated) {
return <Navigate to="/login" state={{ from: location }} replace />;
}
return children;
}
export default PrivateRoute;