// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import HeaderJury from '../components/layout/HeaderJury.jsx';
import Footer from '../components/layout/Footer.jsx';

function JuryLayout() {
    return (
        <>
            <HeaderJury />
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default JuryLayout;