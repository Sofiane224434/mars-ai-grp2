// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminLayout() {
  return (
     <div className="min-h-screen flex">
            <Sidebar variant="admin" />
            <main>
                <Outlet />
            </main>
        </div>
  );
}
export default AdminLayout;
