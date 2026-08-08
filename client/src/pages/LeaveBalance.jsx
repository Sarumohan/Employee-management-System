import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiService } from "../api/apiService";
import "./LeaveBalance.css";

function LeaveBalance() {
  const [balances, setBalances] = useState({
    casual: { total: 12, used: 4 },
    sick: { total: 10, used: 5 },
    annual: { total: 20, used: 5 },
    emergency: { total: 5, used: 2 },
  });

  useEffect(() => {
    async function fetchBalance() {
      try {
        const data = await apiService.getLeaveBalance();
        if (data.leaveBalance) {
          setBalances(data.leaveBalance);
        }
      } catch (err) {
        console.warn("Using default balance fallback:", err.message);
      }
    }
    fetchBalance();
  }, []);

  const calculatePct = (used, total) => {
    const remaining = total - used;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(100, (remaining / total) * 100));
  };

  const categories = [
    { key: "casual", name: "Casual Leave", class: "casual" },
    { key: "sick", name: "Sick Leave", class: "sick" },
    { key: "annual", name: "Annual Leave", class: "annual" },
    { key: "emergency", name: "Emergency Leave", class: "emergency" },
  ];

  return (
    <Layout>
      <div className="balance-page">
        <div className="balance-container">
          <div className="balance-header">
            <h1>Leave Balance</h1>
            <p>Check your available leave balance.</p>
          </div>

          <div className="balance-cards">
            {categories.map((cat) => {
              const item = balances[cat.key] || { total: 10, used: 0 };
              const remaining = item.total - item.used;
              const pct = calculatePct(item.used, item.total);

              return (
                <div className="balance-card" key={cat.key}>
                  <h3>{cat.name}</h3>
                  <p className="remaining">{remaining}</p>
                  <span>Days Remaining</span>

                  <div className="progress">
                    <div
                      className={`progress-bar ${cat.class}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>

                  <small>
                    {remaining} of {item.total} days remaining
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LeaveBalance;