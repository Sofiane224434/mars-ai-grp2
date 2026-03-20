// layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';

function DashboardLayout() {
    return (
        <>
            <Header />
            <main className="flex">
                {/* Sidebar will be added here */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default DashboardLayout;
