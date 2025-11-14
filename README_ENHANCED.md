# 🎓 University Landing Page Platform

A modern, full-stack web application for university enrollment featuring dynamic landing pages, lead management, REST API, and automated workflow integration.

## ✨ Features

### Frontend
- 🎨 Modern, responsive design with gradient backgrounds
- 📱 Mobile-first approach with optimized layouts
- ⚡ Fast loading with CSS animations
- 🔄 Real-time form validation
- 🎯 Interactive university cards
- 📊 Dynamic course and fee information

### Backend
- 🚀 Express.js REST API
- 🔒 Security with Helmet.js
- 🛡️ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- 📝 Comprehensive error handling
- 🔗 Pipedream webhook integration
- 💾 Lead storage and management
- 📊 JSON-based university data

### API Endpoints

#### Universities
- `GET /api/universities` - List all universities
- `GET /api/universities/jnu` - Get Jamia Nalande details
- `GET /api/universities/ashoka` - Get Ashoka Institute details
- `GET /api/universities/:uniId/courses` - Get courses for a university
- `GET /api/universities/:uniId/fees` - Get course fees
- `GET /api/universities/:uniId/placements` - Get placement statistics
- `GET /api/universities/:uniId/facilities` - Get campus facilities

#### Leads
- `POST /api/leads/submit` - Submit lead form
- `GET /api/leads` - Get all leads (admin)
- `GET /api/leads/:leadId` - Get specific lead

#### System
- `GET /api/health` - Health check endpoint

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd University-Landing-Page-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env with your configuration
notepad .env
```

4. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

5. **Access the application**
- Main page: http://localhost:5000
- University 1: http://localhost:5000/university1
- University 2: http://localhost:5000/university2
- API docs: http://localhost:5000 (scroll down)

## 📁 Project Structure

```
University-Landing-Page-main/
├── public/                    # Static files served to clients
│   ├── css/                  # Stylesheets
│   │   └── main.css         # Main CSS file
│   ├── js/                   # Client-side JavaScript
│   │   └── utils.js         # Utility functions
│   ├── index.html           # Main landing page
│   ├── university1.html     # Jamia Nalande page
│   └── university2.html     # Ashoka Institute page
├── server/                   # Backend server
│   ├── data/                # JSON data files
│   │   ├── university1.json
│   │   └── university2.json
│   ├── routes/              # API route handlers
│   │   ├── leads.js         # Lead management
│   │   └── university.js    # University data
│   └── index.js             # Main server file
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Pipedream Integration (Optional)
PIPEDREAM_WEBHOOK_URL=your_webhook_url_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS (Optional)
CORS_ORIGIN=*
```

### Rate Limiting

The application includes two levels of rate limiting:
- **API Routes**: 100 requests per 15 minutes per IP
- **Form Submissions**: 5 submissions per 15 minutes per IP

Adjust these in `.env` or `server/index.js`.

## 🧪 Testing the API

### Using cURL

```bash
# Get all universities
curl http://localhost:5000/api/universities

# Get university details
curl http://localhost:5000/api/universities/jnu

# Submit a lead
curl -X POST http://localhost:5000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Delhi",
    "courseInterested": "B.Tech Computer Science",
    "intakeYear": "2024",
    "consent": true
  }'

# Get all leads
curl http://localhost:5000/api/leads
```

### Using Postman

Import the endpoints manually or use the base URL: `http://localhost:5000/api`

## 🔗 Pipedream Integration

1. Create a free account at [Pipedream.com](https://pipedream.com)
2. Create a new workflow with HTTP webhook trigger
3. Copy the webhook URL
4. Add it to your `.env` file:
   ```env
   PIPEDREAM_WEBHOOK_URL=https://your-webhook-url
   ```
5. Leads will automatically be sent to Pipedream

## 🎨 Customization

### Adding New Universities

1. Create a new JSON file in `server/data/`
2. Add route in `server/routes/university.js`
3. Create a new HTML page in `public/`
4. Add route in `server/index.js`

### Styling

- Global styles: `public/css/main.css`
- Page-specific styles: In `<style>` tags in HTML files
- Variables: Defined in `:root` in CSS

### Form Validation

- Server-side: `server/routes/leads.js` (express-validator)
- Client-side: `public/js/utils.js`

## 📊 Lead Data Structure

```json
{
  "id": "1234567890",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Delhi",
  "courseInterested": "B.Tech Computer Science",
  "intakeYear": "2024",
  "consent": true,
  "submittedAt": "2024-01-01T00:00:00.000Z",
  "source": "Landing Page"
}
```

## 🛡️ Security Features

- **Helmet.js**: Secure HTTP headers
- **Rate Limiting**: Prevent DDoS and brute force
- **Input Validation**: Sanitize all user inputs
- **CORS**: Configurable cross-origin policies
- **Error Handling**: No sensitive data leakage

## 📈 Performance Optimizations

- **Compression**: Gzip compression for responses
- **Caching**: Static file caching
- **Lazy Loading**: Images and assets
- **Minification**: CSS and JavaScript
- **CDN Ready**: Static assets can be served from CDN

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3000
```

### Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
```bash
# Set CORS_ORIGIN in .env
CORS_ORIGIN=http://localhost:3000
```

## 📝 Scripts

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team
- Bootstrap & modern CSS patterns
- Pipedream for workflow automation

## 📞 Support

For support, email support@example.com or open an issue in the repository.

---

Made with ❤️ for education
