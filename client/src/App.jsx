import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import LeaveBalance from "./pages/LeaveBalance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<EmployeeDashboard />} />

        <Route path="/apply-leave" element={<ApplyLeave />} />

        <Route path ="/my-leaves" element={<MyLeaves />} />

        <Route path="/leave-balance" element={<LeaveBalance />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;