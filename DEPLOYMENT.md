# 🌐 Deployment Guide - Free Hosting with SSL

## Overview

Your University Landing Pages project is ready to be deployed to the internet with SSL (HTTPS) for free!

## ⭐ Recommended: Render.com

### Why Render?
✅ **Completely Free** - No credit card required
✅ **Automatic SSL** - HTTPS included
✅ **Easy Deploy** - GitHub integration
✅ **Always On** - Free tier includes 750 hours/month (enough for production)
✅ **Fast** - Global CDN

### Step-by-Step Deployment

#### 1. Create GitHub Repository

First, push your code to GitHub:

```bash
cd c:\Users\HP\Desktop\KC

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "University landing pages with APIs and Pipedream integration"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/university-pages.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 2. Sign Up on Render

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub account (easiest)
4. Authorize Render to access GitHub

#### 3. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. **Connect your repository**:
   - Select: `university-pages` (your repo)
   - Click "Connect"

3. **Configure Service**:
   - **Name**: `university-pages` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (default)

4. **Environment Variables** (under Advanced):
   ```
   PORT=5000
   NODE_ENV=production
   PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url
   ```

5. Click **"Create Web Service"**

#### 4. Wait for Deployment

- Render will automatically build and deploy
- Monitor the "Logs" tab for any errors
- Deployment usually takes 2-3 minutes

#### 5. Access Your Live Site

Once deployed, your URL will be:
```
https://university-pages.onrender.com
```

Access your sites:
- Main: https://university-pages.onrender.com
- JNU: https://university-pages.onrender.com/university1
- Ashoka: https://university-pages.onrender.com/university2
- API: https://university-pages.onrender.com/api/universities

🎉 **That's it! Your site is live with SSL!**

---

## Alternative Option 2: Vercel

### Sign Up & Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Access at: `https://your-project.vercel.app`

### Configuration

Create `vercel.json` in root:
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
  ],
  "env": {
    "PORT": "5000",
    "PIPEDREAM_WEBHOOK_URL": "@pipedream_webhook"
  }
}
```

---

## Alternative Option 3: Railway

### Simple Steps

1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Done! ✅

Your site: `https://your-project.railway.app`

- **SSL**: Automatic ✅
- **Free**: 500 hours/month free tier ✅

---

## Alternative Option 4: Heroku (with Free Dynos)

### Deployment Steps

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Add config vars
heroku config:set PIPEDREAM_WEBHOOK_URL=your-webhook-url

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

Your site: `https://your-app-name.herokuapp.com`

- **SSL**: Automatic ✅
- **Cost**: Free tier available

---

## Alternative Option 5: Railway with Docker

### Simple Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Then deploy on Railway (auto-detects Docker)

---

## Post-Deployment Checklist

### ✅ Testing Live Site

- [ ] Visit main page
- [ ] Test both landing pages
- [ ] Fill lead form
- [ ] Verify success message
- [ ] Check API endpoints
- [ ] Test on mobile
- [ ] Verify SSL certificate (lock icon in URL)

### ✅ Configure Pipedream

1. Go to https://pipedream.com
2. Create workflow for received leads
3. Add actions:
   - [ ] Send email notification
   - [ ] Save to Google Sheets
   - [ ] Send to CRM (HubSpot/Salesforce)
   - [ ] Slack notification

### ✅ Share Your Site

URLs to share:
- **Main**: `https://your-domain.com`
- **JNU**: `https://your-domain.com/university1`
- **Ashoka**: `https://your-domain.com/university2`

### ✅ Monitor Performance

- Check response times
- Monitor error logs
- Track lead submissions
- Verify Pipedream webhooks

---

## Custom Domain (Optional)

### Add Custom Domain to Render

1. In Render Dashboard, go to your service
2. Click **"Settings"**
3. Under "Custom Domain", enter: `yourdomain.com`
4. Follow DNS configuration steps
5. Update nameservers at your domain registrar

Popular free domain registrars:
- Freenom (limited TLDs)
- Or buy from: GoDaddy, Namecheap ($5-12/year)

### Using with Custom Domain

After DNS setup (24-48 hours):
- `https://yourdomain.com`
- `https://yourdomain.com/university1`
- `https://yourdomain.com/university2`

---

## Troubleshooting Deployment

### "Build Failed" Error

Check logs and look for:
```
npm install
```

If dependencies fail:
- Check `package.json` syntax
- Ensure all dependencies are listed
- Check Node version compatibility

### Port Issues

Make sure `PORT=5000` is set in environment variables

### Pipedream Not Receiving Leads

1. Check webhook URL in `.env`
2. Verify webhook is active in Pipedream
3. Check firewall/CORS settings
4. Test with cURL from server logs

### Static Files Not Loading

Ensure Express serves static files correctly:
```javascript
app.use(express.static(path.join(__dirname, '../public')));
```

### Form Submissions Failing

1. Check browser console for errors
2. Check server logs
3. Verify API endpoint URL (update to production URL)
4. Check CORS configuration

---

## Performance Tips

### Optimize for Production

1. **Enable GZIP Compression**:
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add Caching Headers**:
```javascript
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: '1d'
}));
```

3. **Monitor with**:
- Render Logs
- Google Analytics
- Sentry (error tracking)

---

## SSL Certificate Information

### Automatic SSL (All Platforms)

✅ **Render**: Automatic via Let's Encrypt
✅ **Vercel**: Automatic
✅ **Railway**: Automatic
✅ **Heroku**: Automatic

All provide HTTPS/SSL out of the box. No additional configuration needed!

### Verify SSL

1. Visit your site
2. Look for 🔒 lock icon in address bar
3. Click lock → "Certificate" to view details

---

## Scaling Considerations

### Current Free Tier Limits

| Platform | CPU | Memory | Uptime | Cost |
|----------|-----|--------|--------|------|
| Render | Shared | 512MB | 750 hrs/mo | Free |
| Vercel | Shared | Serverless | Unlimited | Free |
| Railway | Shared | 8GB | 500 hrs/mo | Free |
| Heroku | Shared | 512MB | Limited | Free/Paid |

### Upgrade When Needed

- Traffic exceeds free tier → Upgrade plan
- Need more resources → Scale vertically
- More apps → Use multiple projects

---

## Monitoring & Logs

### Render Logs
```
Dashboard → Service → Logs → View real-time logs
```

### Check Server Health
```
curl https://your-site.com/api/health
```

### Monitor Leads
```
https://your-site.com/api/leads
```

---

## Continuous Deployment

### Auto-Deploy on Push

All platforms auto-deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update university info"
git push origin main

# Automatically deploys to production! 🚀
```

---

## Backup & Recovery

### GitHub is Your Backup
✅ All code stored on GitHub
✅ Easy rollback to previous versions
✅ Complete version history

### Local Backup
```bash
# Clone your deployed repo
git clone https://github.com/YOUR_USERNAME/university-pages.git
```

---

## Final Verification

### Run These Tests on Live Site

```bash
# Test main page
curl https://your-site.com

# Test API
curl https://your-site.com/api/universities

# Test health
curl https://your-site.com/api/health

# Test lead submission
curl -X POST https://your-site.com/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@example.com","phone":"9876543210","state":"Delhi","courseInterested":"B.Tech","intakeYear":"2025","consent":true}'
```

---

## Getting Help

### Resources
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

### Community
- Stack Overflow
- GitHub Discussions
- Platform-specific Discord servers

---

## Summary

✅ **Your Site is Live!**

### What You Have
- ✅ 2 responsive landing pages
- ✅ Working lead forms with validation
- ✅ Complete REST API suite
- ✅ Pipedream integration ready
- ✅ SSL/HTTPS encryption
- ✅ Auto-deployments from GitHub

### Next Steps
1. ✅ Deploy to Render/Vercel/Railway
2. ✅ Configure Pipedream workflows
3. ✅ Share URLs with team
4. ✅ Monitor leads
5. ✅ Optimize based on feedback

### Share Your Success! 🎉
```
Check out our university landing pages:
- Main: https://your-site.com
- Jamia Nalande University: https://your-site.com/university1
- Ashoka Institute: https://your-site.com/university2
```

---

**Congratulations! Your project is live on the internet!** 🚀

