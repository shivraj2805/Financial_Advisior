const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
dotenv.config();
require('./models/db');

const financialAdviceRoutes = require("./routes/financialAdvice");
const businessTypesRoutes = require("./routes/businessTypes");
const addRoutes = require("./routes/add");
const communityRoutes = require('./routes/community');
const successStoriesRoutes = require("./routes/successStories")
const schemesRoutes = require("./routes/schemeRoutes");
const ocrRoutes = require("./routes/ocr");
const transactionsRouter = require('./routes/transactions');
const meetingsRoutes = require('./routes/meetings');

const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8080;

// Allow both local and production frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:8080",
  "https://finadvisior.vercel.app",
  "https://finadvisorapp.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all localhost requests for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.finadvisior\.vercel\.app$/.test(origin) ||
      /^https:\/\/.*\.finadvisorapp\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/financial-advice", financialAdviceRoutes);
app.use("/api/business-types", businessTypesRoutes);
app.use("/api/add", addRoutes);
app.use('/api/communities', communityRoutes);
app.use("/api/success-stories",successStoriesRoutes );
app.use("/api/schemes", schemesRoutes);
app.use("/api/ocr", ocrRoutes);
app.use('/api/transactions', transactionsRouter);
app.use('/api/meetings', meetingsRoutes);

app.get("/ping", (req, res) => {
  res.send("Hello Server");
});

// --- SOCKET.IO SETUP ---
const io = new Server(http, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('joinCommunity', (communityId) => {
    socket.join(communityId);
  });

  socket.on('sendMessage', (data) => {
    socket.to(data.communityId).emit('newMessage', data.message);
  });
});

app.set('io', io);

// Serve React frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   });
// }

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});