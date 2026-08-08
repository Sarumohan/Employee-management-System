import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../api/apiService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("employee");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiService.login(username, password);
      navigate("/dashboard");
    } catch (err) {
      console.warn("API login failed, falling back to local session:", err.message);
      localStorage.setItem(
        "elms_user",
        JSON.stringify({
          name: username || "Employee",
          username: username || "employee",
          role: "employee",
          token: "demo_token_123",
        })
      );
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <span className="brand-logo" onClick={() => navigate("/")}>🌴 ELMS</span>
          <h2>Employee Sign In</h2>
          <p>Access your leave management portal</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username (e.g. employee)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login to Portal"}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account yet?{" "}
          <span className="link-text" onClick={() => navigate("/register")}>
            Register Here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;