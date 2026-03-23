// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
//import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default MainLayout;