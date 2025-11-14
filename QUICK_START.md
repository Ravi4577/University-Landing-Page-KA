# 🎓 Quick Start Guide - University Enrollment Platform

## ✅ Project Setup Complete!

Your university landing pages platform is ready to use. Here's everything you need to know:

## 🚀 Running the Project

### Local Development
```bash
cd c:\Users\HP\Desktop\KC
npm start
```

The server will start at: **http://localhost:5000**

### What's Available Locally

| URL | Content |
|-----|---------|
| http://localhost:5000 | 🏠 Main landing page with links to both universities |
| http://localhost:5000/university1 | 🎓 Jamia Nalande University |
| http://localhost:5000/university2 | 🏛️ Ashoka Institute |
| http://localhost:5000/api/health | 🔍 API health check |

## 📋 Project Contents

### ✨ Features Included

✅ **Two Complete Landing Pages**
- Jamia Nalande University (JNU) - New Delhi
- Ashoka Institute of Advanced Studies (AIAS) - Bangalore

✅ **Lead Form with Validation**
- Full Name
- Email (validated)
- Phone (10-digit Indian format)
- State (28 Indian states)
- Course Selection
- Intake Year
- Consent Checkbox
- Real-time validation & success/error messages

✅ **Dynamic Modal for Fees**
- Loads course-wise fees from API
- Course duration and total cost calculations

✅ **REST API Suite** (Returns JSON)

| Endpoint | Purpose |
|----------|---------|
| GET /api/universities | List all universities |
| GET /api/universities/{id}/courses | Get courses |
| GET /api/universities/{id}/fees | Get fees modal data |
| GET /api/universities/{id}/placements | Get placement stats |
| GET /api/universities/{id}/facilities | Get facilities |
| POST /api/leads/submit | Submit lead form |
| GET /api/leads | View all leads (admin) |

✅ **Mobile & Desktop Responsive**
- Works on 320px screens (mobile)
- Optimized for tablets
- Full desktop experience

✅ **Pipedream Integration Ready**
- Webhook configured in .env
- Leads automatically sent to Pipedream workflow
- Ready for CRM/Email automation

## 🔧 Configuration

### .env File

Located at: `c:\Users\HP\Desktop\KC\.env`

```
PORT=5000
NODE_ENV=development
PIPEDREAM_WEBHOOK_URL=https://eohyzk64ob6gydl.m.pipedream.net
```

### Change Webhook URL (Pipedream)

1. Go to https://pipedream.com
2. Create free account
3. Create new workflow → Select "HTTP / Webhook" trigger
4. Copy webhook URL
5. Paste in `.env` file as `PIPEDREAM_WEBHOOK_URL`

## 🧪 Testing Locally

### Test Landing Pages
1. Open browser: http://localhost:5000
2. Click on university links
3. Fill out the lead form
4. Submit - you should see success message

### Test API Endpoints

**Using your browser address bar:**
- http://localhost:5000/api/universities
- http://localhost:5000/api/universities/jnu/courses
- http://localhost:5000/api/universities/jnu/fees
- http://localhost:5000/api/universities/jnu/placements

**Using PowerShell (cURL):**
```powershell
# Get all universities
Invoke-WebRequest -Uri "http://localhost:5000/api/universities" | ConvertFrom-Json

# Get JNU courses
Invoke-WebRequest -Uri "http://localhost:5000/api/universities/jnu/courses" | ConvertFrom-Json

# Submit a test lead
$body = @{
    fullName = "Test User"
    email = "test@example.com"
    phone = "9876543210"
    state = "Delhi"
    courseInterested = "B.Tech - Computer Science & Engineering"
    intakeYear = "2025"
    consent = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/leads/submit" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

## 📱 University Information

### Jamia Nalande University (JNU)
- **URL**: http://localhost:5000/university1
- **Location**: New Delhi, India
- **Students**: 12,000+
- **Placements**: 95%, ₹7.8 LPA avg
- **Courses**: B.Tech (CSE, Mechanical), B.A (Economics), MBA

### Ashoka Institute (AIAS)
- **URL**: http://localhost:5000/university2
- **Location**: Bangalore, India
- **Students**: 8,500+
- **Placements**: 94%, ₹8.2 LPA avg
- **Courses**: B.Tech (ECE, Biotech), BCA, M.A (Data Science)

## 🌐 Deployment to Live Server (Free Hosting)

### Option 1: Deploy to Render (⭐ Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "University landing pages"
   git push origin main
   ```

2. **Create on Render**:
   - Go to https://render.com
   - Sign up (free)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Settings:
     - Runtime: Node
     - Build: `npm install`
     - Start: `npm start`
   - Deploy

3. **Your live URL**: `https://your-app.onrender.com` ✅ SSL included

### Option 2: Vercel

1. Push to GitHub
2. Go to https://vercel.com
3. Import repository
4. Deploy (automatic)
5. Live URL with SSL ✅

### Option 3: Railway

1. Go to https://railway.app
2. Connect GitHub
3. Deploy (automatic)
4. SSL included ✅

### Option 4: Heroku

1. Install Heroku CLI
2. Run: `heroku login`
3. Run: `heroku create`
4. Run: `git push heroku main`
5. Live URL with SSL ✅

## 🔗 Pipedream Setup (For Lead Automation)

### Step 1: Create Pipedream Account
1. Go to https://pipedream.com
2. Sign up (free)
3. Email verification

### Step 2: Create Workflow
1. Click "Create Workflow"
2. Select "HTTP / Webhook" as trigger
3. Copy the webhook URL

### Step 3: Configure in Project
1. Open `.env` file
2. Update `PIPEDREAM_WEBHOOK_URL`:
   ```
   PIPEDREAM_WEBHOOK_URL=https://your-webhook-url-from-pipedream
   ```

### Step 4: Add Actions (Optional)
In Pipedream workflow, add actions to:
- Send email notification when lead received
- Save to Google Sheets
- Post to Slack
- Sync with HubSpot/Salesforce CRM

## 📊 Testing Workflow

### Test Lead Submission
1. Open: http://localhost:5000/university1
2. Scroll to "Apply Now" form
3. Fill all fields:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "9876543210"
   - State: "Delhi"
   - Course: Any option
   - Intake: Any option
   - Check consent
4. Click Submit
5. Should see ✓ success message
6. Check Pipedream workflow to see lead received

## 🛠️ File Locations

```
c:\Users\HP\Desktop\KC\
├── server/
│   ├── index.js                 # Main server
│   ├── routes/
│   │   ├── university.js        # University API
│   │   └── leads.js             # Lead form API
│   └── data/
│       ├── university1.json     # JNU data
│       └── university2.json     # Ashoka data
├── public/
│   ├── index.html               # Main page
│   ├── university1.html          # JNU page
│   └── university2.html          # Ashoka page
├── .env                         # Configuration
├── package.json                 # Dependencies
└── README.md                    # Full documentation
```

## 🔍 Troubleshooting

### Port 5000 in Use?
```bash
# Find process
netstat -ano | findstr :5000

# Kill process
taskkill /PID [PID] /F
```

### Form Not Submitting?
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab
4. Verify server is running

### APIs Not Working?
1. Check server is running
2. Try in browser: http://localhost:5000/api/health
3. Check .env configuration
4. Check firewall settings

### Mobile Not Responsive?
1. Clear browser cache
2. Use incognito mode
3. Test on actual mobile
4. Check viewport meta tag (already included)

## 📈 What to Customize

### Change University Names
Edit: `server/data/university1.json` and `university2.json`

### Change Colors
Edit CSS in landing pages:
```css
:root {
    --primary-color: #667eea;        /* Change main color */
    --secondary-color: #764ba2;      /* Change accent */
}
```

### Add More Courses
Edit JSON files in `server/data/`

### Add More Form Fields
Edit HTML in landing pages (section `id="apply"`)

## 📞 Support Resources

### Documentation
- Full README: `c:\Users\HP\Desktop\KC\README.md`
- API Docs: Available at http://localhost:5000 (main page)

### Testing Tools
- Browser DevTools: F12 in Chrome/Firefox
- API Testing: Use Postman or cURL
- Mobile Testing: Use Chrome DevTools mobile view

## ✅ Deployment Checklist

- [ ] Test all pages locally
- [ ] Test all API endpoints
- [ ] Test lead form submission
- [ ] Test on mobile
- [ ] Set up Pipedream (optional)
- [ ] Push to GitHub
- [ ] Deploy to hosting platform
- [ ] Verify SSL certificate
- [ ] Share live URLs

## 🎉 You're All Set!

### Next Steps:
1. **Run locally**: `npm start`
2. **Test everything**: Fill forms, test APIs
3. **Deploy**: Push to GitHub and deploy
4. **Share URLs**: Give your URLs to others
5. **Monitor leads**: Check Pipedream for submissions

### Live URLs After Deployment:
- Main: `https://your-app.herokuapp.com` (or your domain)
- JNU: `https://your-app.herokuapp.com/university1`
- Ashoka: `https://your-app.herokuapp.com/university2`

---

**Questions?** Check the README.md for detailed documentation!

Happy deploying! 🚀
