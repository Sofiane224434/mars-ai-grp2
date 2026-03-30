// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AdminLayout;
