const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require('./models/db');

const financialAdviceRoutes = require("./routes/financialAdvice");
const businessTypesRoutes = require("./routes/businessTypes");
const addRoutes = require("./routes/add");
const communityRoutes = require('./routes/community');
const successStoriesRoutes = require("./routes/successStories")
const transactionsRouter = require('./routes/transactions');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8080;

// Updated CORS configuration to handle local development
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001", // Added for React dev server
  "http://localhost:8080", // Backend server
  "http://127.0.0.1:3000", // Alternative localhost
  "https://finadvisior.vercel.app",
  "https://finadvisorapp.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request Origin:", origin);
    
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow localhost with any port for development
    if (origin && origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // Allow vercel app domains
    if (
      /^https:\/\/.*\.finadvisior\.vercel\.app$/.test(origin) ||
      /^https:\/\/.*\.finadvisorapp\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/financial-advice", financialAdviceRoutes);
app.use("/api/business-types", businessTypesRoutes);
app.use("/api/add", addRoutes);
app.use('/api/communities', communityRoutes);
app.use("/api/success-stories", successStoriesRoutes);
app.use('/api/transactions', transactionsRouter);

app.get("/ping", (req, res) => {
  res.json({ message: "Hello Server", timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", port: PORT });
});

// --- SOCKET.IO SETUP ---
const io = new Server(http, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('joinCommunity', (communityId) => {
    socket.join(communityId);
    console.log(`User ${socket.id} joined community ${communityId}`);
  });

  socket.on('sendMessage', (data) => {
    socket.to(data.communityId).emit('newMessage', data.message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});