const express = require('express');
const cors = require('cors');
const loginRoute = require('./Routes/loginRoute');
const expenceRoute = require('./Routes/expenceRoute');
const committeeRoutes = require("./Routes/committeeRoute");
const meetingRoute = require("./Routes/meetingRoute");
const documentRoute = require("./Routes/documentRoute");
const tharavRoutes = require("./Routes/tharavRoute");
const purposeRoute = require("./Routes/purposeRoute");

const path = require("path");

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://schoolmanagementcommittee.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Middleware to log requests (useful for debugging)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', loginRoute);
app.use('/api', expenceRoute);
app.use('/api/member', committeeRoutes);
app.use('/api/meeting', meetingRoute);
app.use('/api/documents', documentRoute);
app.use('/api/tharav', tharavRoutes);
app.use('/api/purpose', purposeRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send("Server is running");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Test API for debugging
app.post("/api/expenceData", (req, res) => {
    console.log("Received request:", req.body);
    res.json({ message: "API working" });
});
