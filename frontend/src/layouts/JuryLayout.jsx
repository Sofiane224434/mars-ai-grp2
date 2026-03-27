// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';

function JuryLayout() {
    return (
        <div className="min-h-screen flex bg-noir-bleute">
            <Sidebar variant="jury" />
            <main className="flex-1 min-w-0 bg-noir-bleute">
                <Outlet />
            </main>
        </div>
    );
}
export default JuryLayout;