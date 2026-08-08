import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { apiService } from "../api/apiService";
import "./MyLeaves.css";

function MyLeaves() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaves() {
      try {
        const data = await apiService.getMyLeaves();
        setLeaves(data);
      } catch (err) {
        console.warn("Using default leaves fallback:", err.message);
        setLeaves([
          {
            _id: "1",
            leaveType: "casual",
            fromDate: "2026-08-05",
            toDate: "2026-08-06",
            days: 2,
            reason: "Personal work",
            status: "Pending",
          },
          {
            _id: "2",
            leaveType: "sick",
            fromDate: "2026-07-20",
            toDate: "2026-07-21",
            days: 2,
            reason: "Not feeling well",
            status: "Approved",
          },
          {
            _id: "3",
            leaveType: "annual",
            fromDate: "2026-06-10",
            toDate: "2026-06-12",
            days: 3,
            reason: "Family trip",
            status: "Rejected",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaves();
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
    <Layout>
      <div className="my-leaves-page">
        <div className="my-leaves-container">
          <div className="page-header">
            <div>
              <h1>My Leaves</h1>
              <p>View and track all your leave requests.</p>
            </div>

            <button
              className="apply-leave-btn"
              onClick={() => navigate("/apply-leave")}
            >
              + Apply Leave
            </button>
          </div>

          <div className="leave-table-container">
            <table>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "1.5rem" }}>
                      Loading leaves...
                    </td>
                  </tr>
                ) : leaves.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "1.5rem" }}>
                      No leave applications found.
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id || leave.id}>
                      <td style={{ textTransform: "capitalize" }}>
                        {leave.leaveType} Leave
                      </td>
                      <td>{formatDate(leave.fromDate)}</td>
                      <td>{formatDate(leave.toDate)}</td>
                      <td>{leave.days}</td>
                      <td>{leave.reason}</td>
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
        </div>
      </div>
    </Layout>
  );
}

export default MyLeaves;