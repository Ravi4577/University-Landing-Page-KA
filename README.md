# University Enrollment Platform 🎓

A complete, production-ready platform featuring two single-page landing pages for private universities with integrated lead forms, REST APIs, and Pipedream workflow automation.

## 📋 Project Overview

This project includes:

### ✨ Features
- **2 Responsive Landing Pages**: For Jamia Nalande University and Ashoka Institute
- **Lead Form Integration**: With Pipedream workflow automation
- **REST APIs**: Complete API suite returning simple and nested JSON data
- **Mobile & Desktop Responsive**: Works seamlessly on all devices
- **SSL Ready**: Ready for deployment on free hosting platforms with HTTPS
- **Form Validation**: Email, phone (10-digit India format), and consent validation
- **Modal Fee Calculator**: Dynamic fee display from JSON APIs
- **Real-time Placements Data**: Top recruiters and placement statistics

### 🏗️ Project Structure

```
KC/
├── public/                 # Frontend files
│   ├── index.html         # Main landing page
│   ├── university1.html    # Jamia Nalande University
│   └── university2.html    # Ashoka Institute
├── server/
│   ├── index.js          # Express server
│   ├── routes/
│   │   ├── university.js  # University API routes
│   │   └── leads.js       # Lead form routes
│   └── data/
│       ├── university1.json    # JNU data
│       └── university2.json    # Ashoka data
├── package.json          # Dependencies
├── .env                  # Environment variables
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Pipedream account (free) for lead automation

### Installation

1. **Clone/Navigate to project**:
   ```bash
   cd c:\Users\HP\Desktop\KC
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Pipedream Webhook** (Optional):
   - Go to https://pipedream.com
   - Create a free account
   - Create a new workflow
   - Add an HTTP trigger (get the webhook URL)
   - Update `.env` with the webhook URL:
     ```
     PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url
     ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Access locally**:
   - Home: http://localhost:5000
   - JNU: http://localhost:5000/university1
   - Ashoka: http://localhost:5000/university2

## 📚 Landing Pages

### Jamia Nalande University (JNU) - `/university1`
- **Location**: New Delhi
- **Students**: 12,000+
- **Accreditation**: NAAC A+
- **Placements**: 95% placement rate, ₹7.8 LPA average
- **Courses**: B.Tech CSE, Mechanical, B.A Economics, MBA
- **Features**: Responsive design, fees modal, placement statistics

### Ashoka Institute (AIAS) - `/university2`
- **Location**: Bangalore
- **Students**: 8,500+
- **Accreditation**: NAAC A
- **Placements**: 94% placement rate, ₹8.2 LPA average
- **Courses**: B.Tech ECE, Biotech, BCA, M.A Data Science
- **Features**: Responsive design, fees modal, placement statistics

## 📋 Lead Form Fields

All forms include:
- ✓ Full Name
- ✓ Email Address
- ✓ Phone Number (10-digit India format)
- ✓ State (28 Indian states)
- ✓ Course Interested
- ✓ Intake Year
- ✓ Consent Checkbox

**Behavior**:
- Real-time form validation
- Success/error messages without page refresh
- Automatic submission to Pipedream webhook
- Local storage of lead data

## 🔌 REST API Endpoints

### Base URL
```
http://localhost:5000/api
```

### University Endpoints

#### Get All Universities
```
GET /universities
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "jnu",
      "name": "Jamia Nalande University",
      "location": "New Delhi, India",
      "link": "/university/jnu"
    },
    {
      "id": "ashoka",
      "name": "Ashoka Institute of Advanced Studies",
      "location": "Bangalore, India",
      "link": "/university/ashoka"
    }
  ]
}
```

#### Get University Details
```
GET /universities/jnu
GET /universities/ashoka
```

#### Get Courses
```
GET /universities/jnu/courses
```
Response:
```json
{
  "success": true,
  "universityName": "Jamia Nalande University",
  "data": [
    {
      "id": "btech-cse",
      "name": "B.Tech - Computer Science & Engineering",
      "duration": "4 Years",
      "fees": {
        "min": 350000,
        "max": 450000,
        "perYear": true
      },
      "eligibility": "12th Pass with PCM (75% aggregate)",
      "placements": "95% average package ₹8 LPA"
    }
  ]
}
```

#### Get Course-wise Fees (Modal Data)
```
GET /universities/jnu/fees
```

#### Get Placements
```
GET /universities/jnu/placements
```

#### Get Facilities
```
GET /universities/jnu/facilities
```

### Lead Form Endpoints

#### Submit Lead
```
POST /leads/submit
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Delhi",
  "courseInterested": "B.Tech - Computer Science & Engineering",
  "intakeYear": "2025",
  "consent": true
}
```

Response:
```json
{
  "success": true,
  "message": "Lead submitted successfully! We will contact you soon.",
  "leadId": "1699999999999"
}
```

#### Get All Leads (Admin)
```
GET /leads
```

## 🔐 Form Validation Rules

### Phone Number
- Exactly 10 digits
- Must start with 6-9
- Format: Indian mobile numbers only

### Email
- Must be valid email format
- Required field

### Consent
- Checkbox must be checked
- Required for submission

## 🌐 Deployment Instructions

### Option 1: Deploy to Render (Recommended - Free, with SSL)

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to https://render.com
   - Sign up (free)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Settings:
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Add `.env` variables
   - Deploy

3. **Access**:
   - Your site will be live at: `https://your-app.onrender.com`
   - All pages have SSL automatically ✓

### Option 2: Deploy to Vercel (Free, with SSL)

1. **Update package.json**:
   ```json
   {
     "scripts": {
       "start": "node server/index.js",
       "build": "echo 'No build needed'"
     }
   }
   ```

2. **Create `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server/index.js"
       }
     ]
   }
   ```

3. **Deploy**:
   - Go to https://vercel.com
   - Import GitHub repository
   - Deploy (SSL automatically configured)

### Option 3: Deploy to Heroku (Free Dyno, with SSL)

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Deploy**: `git push heroku main`
5. **Access**: `https://your-app-name.herokuapp.com`

### Option 4: Deploy to Railway (Free, with SSL)

1. **Go to https://railway.app**
2. **Connect GitHub**
3. **Deploy (automatic)**
4. **Railway provides SSL automatically**

## 🔗 Pipedream Workflow Integration

### Setting up Pipedream

1. **Create Account**: https://pipedream.com (free)

2. **Create Workflow**:
   - Click "Create Workflow"
   - Add "HTTP / Webhook" trigger
   - Copy the webhook URL

3. **Update .env**:
   ```
   PIPEDREAM_WEBHOOK_URL=https://eohyzk64ob6gydl.m.pipedream.net
   ```

4. **Add Actions to Workflow**:
   - **Email Notification**: Send email when lead received
   - **Google Sheets**: Log leads to spreadsheet
   - **Slack**: Post to Slack channel
   - **CRM Integration**: Send to HubSpot, Salesforce, etc.

### Example Pipedream Actions

```javascript
// Send email notification
export default defineComponent({
  async run({ steps, $ }) {
    const lead = steps.trigger.event;
    
    await $mail.sendMail({
      to: "admissions@university.edu.in",
      subject: `New Lead: ${lead.fullName}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${lead.fullName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>State:</strong> ${lead.state}</p>
        <p><strong>Course:</strong> ${lead.courseInterested}</p>
      `
    });
  }
});
```

## 📱 Responsive Design Features

✓ **Mobile First Design** (320px+)
✓ **Tablet Optimized** (768px+)
✓ **Desktop Experience** (1200px+)
✓ **Touch-friendly Forms**
✓ **Fast Loading**
✓ **Accessibility Compliant**

## 🔍 Testing APIs

### Using cURL

```bash
# Get all universities
curl http://localhost:5000/api/universities

# Get JNU courses
curl http://localhost:5000/api/universities/jnu/courses

# Get fees
curl http://localhost:5000/api/universities/jnu/fees

# Submit lead
curl -X POST http://localhost:5000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "state": "Delhi",
    "courseInterested": "B.Tech - Computer Science & Engineering",
    "intakeYear": "2025",
    "consent": true
  }'
```

### Using Postman

1. Import collection from API endpoints
2. Set variables for base URL
3. Test each endpoint
4. Verify JSON responses

## 🛠️ Troubleshooting

### Port 5000 Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Or change port in .env
PORT=3000
```

### Pipedream Not Receiving Leads
- Check webhook URL in .env
- Verify Pipedream workflow is active
- Check console logs for errors
- Test with cURL

### Forms Not Submitting
- Check browser console for errors
- Verify API server is running
- Check network tab in DevTools
- Ensure form validation passes

### Mobile Layout Issues
- Clear browser cache
- Test in incognito mode
- Check viewport meta tag
- Test on actual mobile device

## 📊 Performance Optimizations

✓ Minified CSS/JS
✓ Optimized images
✓ Lazy loading for modals
✓ Efficient API responses
✓ Caching enabled
✓ GZIP compression

## 🔒 Security Features

✓ HTTPS/SSL on all hosting platforms
✓ Form input validation
✓ Email format validation
✓ Phone number format validation
✓ CORS enabled
✓ No sensitive data in frontend code

## 📈 Analytics Integration

To add analytics, update the landing pages with:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🎨 Customization Guide

### Change University Information
Edit `server/data/university1.json` or `server/data/university2.json`

### Change Colors
Update CSS variables in landing pages:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* etc */
}
```

### Add More Universities
1. Create new JSON file in `server/data/`
2. Add route in `server/routes/university.js`
3. Create new landing page HTML

### Modify Form Fields
Edit form fields in `public/university1.html` and `public/university2.html`

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify environment configuration

## ✅ Checklist for Deployment

- [ ] Install Node.js and npm
- [ ] Run `npm install`
- [ ] Set up Pipedream account (optional)
- [ ] Update `.env` file
- [ ] Test locally: `npm start`
- [ ] Test all landing pages
- [ ] Test lead form submission
- [ ] Test all API endpoints
- [ ] Deploy to hosting platform
- [ ] Verify SSL certificate
- [ ] Test on mobile devices
- [ ] Configure Pipedream workflows
- [ ] Share live URLs

## 🚀 Live Demo

After deployment, share these URLs:
- Main Site: `https://your-domain.com`
- JNU: `https://your-domain.com/university1`
- Ashoka: `https://your-domain.com/university2`
- API Docs: Visit main site for API documentation

---

Built with ❤️ for educational excellence!
