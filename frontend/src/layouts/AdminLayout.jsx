// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gris-anthracite">
      <Sidebar variant="admin" />
      <main className="flex-1 min-w-0 bg-gris-anthracite">
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout;
