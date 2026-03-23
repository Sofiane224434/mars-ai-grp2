// components/Header.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
                    Starter Kit
                </Link>
                <nav className="flex gap-6 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-blue-200 transition ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        Accueil
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `hover:text-blue-200 transition ${isActive ? 'font-bold' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    )}
                </nav>
                <div className="flex gap-4 items-center">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-200 transition font-medium"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Header;