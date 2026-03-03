// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
function MainLayout() {
return (
<div>
    <Header />
        <main>
            <Outlet />
        </main>
    <Footer />
</div>
);
}
export default MainLayout;