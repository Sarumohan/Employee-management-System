# Employee Leave Management System

A full-stack MERN (MongoDB Atlas, Express.js, React, Node.js) Employee Leave Management application.

The project is cleanly structured into two folders (`client` and `server`) and is configured for seamless **single-unit deployment on Render**.

---

## 📁 Directory Structure

```
EMPLOYEE LEAVE MANAGEMENT SYSTEM/
├── client/                 # Frontend React + Vite app
│   ├── src/
│   │   ├── api/            # Centralized API service (apiService.js)
│   │   ├── components/     # Layout & Sidebar components
│   │   ├── pages/          # Pages (Login, Dashboard, ApplyLeave, MyLeaves, LeaveBalance)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js      # Dev proxy setup for /api
├── server/                 # Backend Node.js + Express app
│   ├── config/             # Database connection (db.js)
│   ├── models/             # Mongoose schemas (User.js, Leave.js)
│   ├── routes/             # REST API routes (authRoutes.js, leaveRoutes.js)
│   ├── middleware/         # Auth JWT middleware
│   ├── .env                # MongoDB Atlas connection & secret environment variables
│   ├── package.json
│   └── server.js           # Express app & static client builder server
└── package.json            # Root configuration for single-unit Render deployment
```

---

## ⚙️ 1. MongoDB Atlas Configuration

Open `server/.env` and replace `<db_password>` with your MongoDB Atlas database user password:

```env
PORT=5000
MONGODB_URI=mongodb+srv://sarurabha7_db_user:<db_password>@cluster0.yh9a9jg.mongodb.net/employee_leave_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=elms_super_secret_jwt_key_2026
NODE_ENV=development
```

---

## 🚀 2. Running Locally

### Step A: Install dependencies for both client and server
Run this single command at the project root:
```bash
npm run postinstall
```

### Step B: Build the frontend React app
```bash
npm run build
```

### Step C: Start the backend server (serves both API & Frontend)
```bash
npm start
```
Open `http://localhost:5000` in your browser.

> **Credentials**:  
> Username: `employee`  
> Password: `123` (or any string)

---

## 🌐 3. How to Deploy as a Single Unit on Render

Deploy both the frontend React application and backend Express server together on **Render** as a single **Web Service**:

1. **Push your code to GitHub** (e.g. repository `Sarumohar/croudFunding` or similar).
2. Go to **[Render Dashboard](https://dashboard.render.com)** -> Click **New +** -> Select **Web Service**.
3. Connect your GitHub repository.
4. Set the build settings as follows:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Scroll down to **Environment Variables** and add:
   - `MONGODB_URI` = `mongodb+srv://sarurabha7_db_user:<YOUR_ACTUAL_PASSWORD>@cluster0.yh9a9jg.mongodb.net/employee_leave_db?retryWrites=true&w=majority&appName=Cluster0`
   - `JWT_SECRET` = `elms_super_secret_jwt_key_2026`
   - `NODE_ENV` = `production`
6. Click **Create Web Service**.

Render will install dependencies, build the React frontend into `client/dist`, launch `server/server.js`, and host the full-stack application under a single Render URL!
