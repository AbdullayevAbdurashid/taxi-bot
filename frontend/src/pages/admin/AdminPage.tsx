import AdminSidebar from "../../components/Layout/Sidebar/AdminSidebar";
import AdminAuth from "./AdminAuth";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("admin", "true");
    navigate("/admin/drivers");
  };

  return (
    <>
      <AdminAuth onLogin={handleLogin} />
    </>
  );
};

export default AdminPage;
