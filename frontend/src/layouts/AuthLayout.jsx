// layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
function AuthLayout() {
    return (
        <div>
            <Outlet /> {/* La page enfant (Login ou Register) s'affiche ici */}
        </div>
    );
}
export default AuthLayout;