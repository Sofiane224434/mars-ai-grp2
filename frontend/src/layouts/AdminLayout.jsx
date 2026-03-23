// layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/layout/HeaderAdmin.jsx';
import Footer from '../components/layout/Footer.jsx';

function AdminLayout() {
    return (
        <>
            <HeaderAdmin />
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default AdminLayout;