import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiService } from "../api/apiService";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAllowed: 47,
    totalUsedDays: 16,
    remainingTotal: 31,
    pendingRequests: 1,
  });
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = apiService.getCurrentUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const [balanceData, leavesData] = await Promise.all([
          apiService.getLeaveBalance(),
          apiService.getMyLeaves(),
        ]);
        setStats(balanceData);
        setRecentLeaves(leavesData);
      } catch (err) {
        console.warn("Using default stats/leaves fallback:", err.message);
        setRecentLeaves([
          {
            _id: "1",
            leaveType: "casual",
            fromDate: "2026-08-05",
            toDate: "2026-08-06",
            days: 2,
            status: "Pending",
          },
          {
            _id: "2",
            leaveType: "sick",
            fromDate: "2026-07-20",
            toDate: "2026-07-21",
            days: 2,
            status: "Approved",
          },
          {
            _id: "3",
            leaveType: "annual",
            fromDate: "2026-06-10",
            toDate: "2026-06-12",
            days: 3,
            status: "Rejected",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <div className="top-bar">
          <div>
            <h1>Employee Dashboard</h1>
            <p>Welcome back, {currentUser?.name || "Employee"}! Here's your leave overview.</p>
          </div>

          <div className="profile">👤 {currentUser?.name || "Employee"}</div>
        </div>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-card">
            <h3>Total Leave</h3>
            <p>{stats.totalAllowed}</p>
          </div>

          <div className="stat-card">
            <h3>Used Leave</h3>
            <p>{stats.totalUsedDays}</p>
          </div>

          <div className="stat-card">
            <h3>Remaining Leave</h3>
            <p>{stats.remainingTotal}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p>{stats.pendingRequests}</p>
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Leave Requests</h2>

            <button className="apply-btn" onClick={() => navigate("/apply-leave")}>
              + Apply Leave
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentLeaves.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textCenter: "center", padding: "1rem" }}>
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                recentLeaves.slice(0, 5).map((leave) => (
                  <tr key={leave._id || leave.id}>
                    <td style={{ textTransform: "capitalize" }}>{leave.leaveType} Leave</td>
                    <td>{formatDate(leave.fromDate)}</td>
                    <td>{formatDate(leave.toDate)}</td>
                    <td>{leave.days}</td>
                    <td>
                      <span className={`status ${leave.status?.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;