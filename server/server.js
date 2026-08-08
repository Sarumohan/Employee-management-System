const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Employee Leave Management API is running',
    timestamp: new Date(),
  });
});

// Single-Unit Production Deployment: Serve built client static files
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  // If request starts with /api and reaches here, return 404 JSON instead of HTML
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API Endpoint Not Found' });
  }
  // Otherwise, serve index.html for React SPA Router
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Employee Leave Management System</title></head>
          <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
            <h2>Employee Leave Management System API Running!</h2>
            <p>Frontend is not built yet or index.html is missing. Run <code>npm run build</code> to generate client build files.</p>
            <p><a href="/api/health">Check API Health Status</a></p>
          </body>
        </html>
      `);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
