// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import PanelJury from '../components/layout/PanelJury.jsx';

function JuryLayout() {
    return (
        <>
            <PanelJury />
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default JuryLayout;