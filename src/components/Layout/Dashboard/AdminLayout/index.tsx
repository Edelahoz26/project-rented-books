import { Link, Outlet } from "react-router";
import AdminDashboard from "../../../../pages/Admin";

const AdminLayout: React.FC = () => {
    return (
      <div>
        <AdminDashboard />
        <Link to={'/dashboard/create-books'}>Ver</Link>
        <div className="dashboard-content">
          {/* Aquí se renderizan las rutas hijas */}
          <Outlet />
        </div>
      </div>
    );
  };

  export default AdminLayout;