// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';

function JuryLayout() {
    return (
        <div className="min-h-screen flex bg-gris-anthracite">
            <Sidebar variant="jury" />
            <main className="flex-1 min-w-0 bg-gris-anthracite">
                <Outlet />
            </main>
        </div>
    );
}
export default JuryLayout;