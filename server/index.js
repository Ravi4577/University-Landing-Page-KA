const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts for now
    crossOriginEmbedderPolicy: false
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limit for form submissions
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 form submissions per windowMs
    message: 'Too many form submissions, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Import routes
const universityRoutes = require('./routes/university');
const leadsRoutes = require('./routes/leads');

// Define specific routes BEFORE static middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve university pages and allow trailing slashes or extra path segments
app.get(['/university1', '/university1/', '/university1/*'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/university1.html'));
});

app.get(['/university2', '/university2/', '/university2/*'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/university2.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/universities', universityRoutes);
app.use('/api/leads', formLimiter, leadsRoutes);

// Serve static files from public directory (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public')));

// 404 / fallback handler
// For API routes, return JSON 404. For browser navigation (GET requests expecting HTML), serve index.html
app.use((req, res, next) => {
    // If the request is for API, return JSON 404
    if (req.path.startsWith('/api') || req.path.startsWith('/api/')) {
        return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }

    // For GET requests that expect HTML, serve index.html (helps client-side routing and browser navigation)
    if (req.method === 'GET' && req.accepts && req.accepts('html')) {
        return res.sendFile(path.join(__dirname, '../public/index.html'));
    }

    // Default JSON 404 for other requests
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    // Handle different types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: err.errors
        });
    }
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access'
        });
    }
    
    // Default error response
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message || 'Something went wrong',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 University Landing Pages Server`);
    console.log(`📍 Running on: http://localhost:${PORT}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    console.log(`\n📚 Landing Pages:`);
    console.log(`   - Jamia Nalande University: http://localhost:${PORT}/university1`);
    console.log(`   - Ashoka Institute: http://localhost:${PORT}/university2`);
    console.log(`\n✅ Server ready to accept connections\n`);
});

module.exports = app;
