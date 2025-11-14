# 🚀 Quick Start Guide

## Installation (2 minutes)

### Option 1: Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup
```powershell
# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start the server
npm run dev
```

## Access Your Application

Once the server is running:

- **Main Page**: http://localhost:5000
- **University 1**: http://localhost:5000/university1
- **University 2**: http://localhost:5000/university2

## Test the API

### Health Check
```powershell
curl http://localhost:5000/api/health
```

### Get Universities
```powershell
curl http://localhost:5000/api/universities
```

### Submit a Test Lead
```powershell
curl -X POST http://localhost:5000/api/leads/submit `
  -H "Content-Type: application/json" `
  -d '{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"9876543210\",\"state\":\"Delhi\",\"courseInterested\":\"B.Tech\",\"intakeYear\":\"2025\",\"consent\":true}'
```

## What's New? ✨

1. **Fixed all CSS errors** - No more inline styles
2. **Added security** - Rate limiting & input validation
3. **Better forms** - Real-time validation with feedback
4. **Enhanced API** - Proper error handling & logging
5. **Documentation** - Comprehensive README & guides

## Need Help?

- **Full Documentation**: See `README_ENHANCED.md`
- **All Changes**: See `ENHANCEMENT_SUMMARY.md`
- **Configuration**: Edit `.env` file

## Next Steps

1. ✅ Server is running
2. Edit `.env` for custom configuration
3. Add your Pipedream webhook URL (optional)
4. Customize university data in `server/data/`
5. Deploy to production when ready

---

**Enjoy your enhanced University Landing Page! 🎓**
