import { useNavigate } from "react-router-dom";
import { apiService } from "../api/apiService";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const currentUser = apiService.getCurrentUser();

  const handleLogout = () => {
    apiService.logout();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2>ELMS</h2>
      <p className="user-role">{currentUser?.name || "Employee"}</p>

      <nav>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/apply-leave")}>Apply Leave</button>
        <button onClick={() => navigate("/my-leaves")}>My Leaves</button>
        <button onClick={() => navigate("/leave-balance")}>Leave Balance</button>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;