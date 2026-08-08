const API_BASE = '/api';

const getAuthHeaders = () => {
  const userStr = localStorage.getItem('elms_user');
  if (!userStr) return { 'Content-Type': 'application/json' };
  try {
    const user = JSON.parse(userStr);
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    };
  } catch (e) {
    return { 'Content-Type': 'application/json' };
  }
};

export const apiService = {
  // Login
  login: async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    localStorage.setItem('elms_user', JSON.stringify(data));
    return data;
  },

  // Register
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    localStorage.setItem('elms_user', JSON.stringify(data));
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('elms_user');
  },

  // Get current user stored session
  getCurrentUser: () => {
    const userStr = localStorage.getItem('elms_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  // Get user's leaves
  getMyLeaves: async () => {
    const res = await fetch(`${API_BASE}/leaves/my-leaves`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch leaves');
    }
    return data;
  },

  // Get leave balance and stats
  getLeaveBalance: async () => {
    const res = await fetch(`${API_BASE}/leaves/balance`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch leave balance');
    }
    return data;
  },

  // Submit leave application
  applyLeave: async (leaveData) => {
    const res = await fetch(`${API_BASE}/leaves/apply`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(leaveData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit leave request');
    }
    return data;
  },
};
