import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Header */}
      <header className="home-header">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🌴</span>
          <span className="logo-text">ELMS</span>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <button className="nav-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-register-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">Modern HR & Workforce Portal</span>
          <h1>
            Streamline Employee <br />
            <span className="highlight-text">Leave Management</span>
          </h1>
          <p>
            Say goodbye to cumbersome paperwork. Request leave in seconds, track real-time balances, 
            and keep your team synchronized with automated approvals.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Create Free Account →
            </button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Sign In to Portal
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <h3>100%</h3>
              <p>Automated Calculations</p>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <h3>Real-Time</h3>
              <p>Status Tracking</p>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <h3>24/7</h3>
              <p>Cloud Access</p>
            </div>
          </div>
        </div>

        <div className="hero-card-preview">
          <div className="preview-glass-card">
            <div className="card-header">
              <span className="status-dot green"></span>
              <h4>Leave Balance Overview</h4>
            </div>
            <div className="card-body">
              <div className="card-metric-row">
                <span>Casual Leave</span>
                <strong>8 / 12 Days Remaining</strong>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill casual" style={{ width: "66%" }}></div>
              </div>

              <div className="card-metric-row">
                <span>Sick Leave</span>
                <strong>5 / 10 Days Remaining</strong>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill sick" style={{ width: "50%" }}></div>
              </div>

              <div className="card-metric-row">
                <span>Annual Leave</span>
                <strong>15 / 20 Days Remaining</strong>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill annual" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="card-footer">
              <span className="recent-tag">Recent Request: Casual Leave (Pending)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-title">
          <h2>Everything You Need for Effortless Leaves</h2>
          <p>Designed for employees and managers to keep time-off simple and transparent.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Quick Apply</h3>
            <p>Select leave type, pick date ranges, and submit reasons in a few clicks.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Live Balance Tracker</h3>
            <p>Automatic quota deductions and visual progress bars for casual, sick, annual, and emergency leaves.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Updates</h3>
            <p>Track request statuses live from Pending to Approved or Rejected in real time.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure & Scalable</h3>
            <p>Backed by MongoDB Atlas cloud cluster and protected with JWT token authentication.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Employee Leave Management System (ELMS). All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
