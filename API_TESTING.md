# 🔌 API Testing Guide

## Quick API Reference

All APIs are available at: `http://localhost:5000/api`

## Health Check

### Test if Server is Running
```
GET /health
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-12T10:00:00.000Z"
}
```

## University APIs

### 1. Get All Universities

```
GET /universities
```

**cURL:**
```bash
curl http://localhost:5000/api/universities
```

**Response:**
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

### 2. Get Specific University Details

```
GET /universities/{uniId}
```

**Example:**
```
GET /universities/jnu
```

**cURL:**
```bash
curl http://localhost:5000/api/universities/jnu
```

**Response: (Nested JSON)**
```json
{
  "success": true,
  "data": {
    "id": "jnu",
    "name": "Jamia Nalande University",
    "shortName": "JNU",
    "tagline": "Empowering Minds, Shaping Futures",
    "location": "New Delhi, India",
    "established": 2005,
    "logo": "🎓",
    "heroImage": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "overview": {
      "description": "Jamia Nalande University is a premier institution...",
      "studentCount": "12,000+",
      "facultyCount": "800+",
      "accreditation": "NAAC A+ Accredited"
    },
    "courses": [...],
    "placements": {...},
    "facilities": [...]
  }
}
```

### 3. Get Courses by University

```
GET /universities/{uniId}/courses
```

**Example:**
```
GET /universities/jnu/courses
```

**cURL:**
```bash
curl http://localhost:5000/api/universities/jnu/courses
```

**Response:**
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
    },
    {
      "id": "btech-mech",
      "name": "B.Tech - Mechanical Engineering",
      "duration": "4 Years",
      "fees": {
        "min": 320000,
        "max": 420000,
        "perYear": true
      },
      "eligibility": "12th Pass with PCM (70% aggregate)",
      "placements": "92% average package ₹7.2 LPA"
    }
  ]
}
```

### 4. Get Course-wise Fees (For Modal)

```
GET /universities/{uniId}/fees
```

**Example:**
```
GET /universities/jnu/fees
```

**cURL:**
```bash
curl http://localhost:5000/api/universities/jnu/fees
```

**Response:**
```json
{
  "success": true,
  "universityName": "Jamia Nalande University",
  "data": [
    {
      "id": "btech-cse",
      "name": "B.Tech - Computer Science & Engineering",
      "duration": "4 Years",
      "feeRange": "₹350,000 - ₹450,000 per year",
      "feesPerYear": true,
      "fourYearTotal": "₹1,800,000"
    },
    {
      "id": "btech-mech",
      "name": "B.Tech - Mechanical Engineering",
      "duration": "4 Years",
      "feeRange": "₹320,000 - ₹420,000 per year",
      "feesPerYear": true,
      "fourYearTotal": "₹1,680,000"
    }
  ]
}
```

### 5. Get Placement Statistics

```
GET /universities/{uniId}/placements
```

**Example:**
```
GET /universities/jnu/placements
```

**cURL:**
```bash
curl http://localhost:5000/api/universities/jnu/placements
```

**Response:**
```json
{
  "success": true,
  "universityName": "Jamia Nalande University",
  "data": {
    "averagePackage": "₹7.8 LPA",
    "highestPackage": "₹24 LPA",
    "placementRate": "95%",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS",
      "Infosys",
      "Deloitte",
      "Goldman Sachs",
      "Accenture"
    ]
  }
}
```

### 6. Get Campus Facilities

```
GET /universities/{uniId}/facilities
```

**Example:**
```
GET /universities/ashoka/facilities
```

**cURL:**
```bash
curl http://localhost:5000/api/universities/ashoka/facilities
```

**Response:**
```json
{
  "success": true,
  "universityName": "Ashoka Institute of Advanced Studies",
  "data": [
    {
      "name": "Research Park",
      "description": "State-of-the-art research facilities with industry partnerships"
    },
    {
      "name": "Tech Hub",
      "description": "Innovation center with incubation programs"
    },
    {
      "name": "Auditorium",
      "description": "5,000-seater auditorium with advanced AV systems"
    }
  ]
}
```

## Lead Form APIs

### 7. Submit Lead Form

```
POST /leads/submit
Content-Type: application/json
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Delhi",
    "courseInterested": "B.Tech - Computer Science & Engineering",
    "intakeYear": "2025",
    "consent": true
  }'
```

**Request Body:**
```json
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

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead submitted successfully! We will contact you soon.",
  "leadId": "1699999999999"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Please enter a valid 10-digit Indian phone number"
}
```

**Validation Errors:**
- Missing required fields → 400
- Invalid email format → 400
- Invalid phone (not 10 digits) → 400
- Phone not starting with 6-9 → 400
- Consent not checked → 400

### 8. Get All Leads (Admin)

```
GET /leads
```

**cURL:**
```bash
curl http://localhost:5000/api/leads
```

**Response:**
```json
{
  "success": true,
  "totalLeads": 3,
  "data": [
    {
      "id": "1699999999999",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "state": "Delhi",
      "courseInterested": "B.Tech - Computer Science & Engineering",
      "intakeYear": "2025",
      "consent": true,
      "submittedAt": "2024-11-12T10:00:00.000Z",
      "source": "Landing Page"
    }
  ]
}
```

### 9. Get Specific Lead by ID

```
GET /leads/{leadId}
```

**Example:**
```
GET /leads/1699999999999
```

**cURL:**
```bash
curl http://localhost:5000/api/leads/1699999999999
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1699999999999",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Delhi",
    "courseInterested": "B.Tech - Computer Science & Engineering",
    "intakeYear": "2025",
    "consent": true,
    "submittedAt": "2024-11-12T10:00:00.000Z",
    "source": "Landing Page"
  }
}
```

## Testing in PowerShell (Windows)

### Simple GET Request
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/universities" | ConvertFrom-Json
```

### POST Request (Lead Form)
```powershell
$body = @{
    fullName = "John Doe"
    email = "john@example.com"
    phone = "9876543210"
    state = "Delhi"
    courseInterested = "B.Tech - Computer Science & Engineering"
    intakeYear = "2025"
    consent = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/leads/submit" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body | ConvertFrom-Json
```

## Testing with Postman

1. **Import URL**: http://localhost:5000/api/universities
2. **Create GET request** to test endpoints
3. **Create POST request** to test lead submission
4. **Set Headers**: Content-Type: application/json

## University IDs

Use these IDs in API endpoints:

| Name | ID |
|------|-----|
| Jamia Nalande University | `jnu` |
| Ashoka Institute | `ashoka` |

## Error Codes

| Status | Meaning |
|--------|---------|
| 200 | Success - GET request worked |
| 201 | Success - POST request worked (lead created) |
| 400 | Bad request - validation error |
| 404 | Not found - university/lead doesn't exist |
| 500 | Server error |

## Example Integration (JavaScript)

```javascript
// Get all universities
async function getUniversities() {
  const response = await fetch('/api/universities');
  const data = await response.json();
  console.log(data.data);
}

// Get courses
async function getCourses(uniId) {
  const response = await fetch(`/api/universities/${uniId}/courses`);
  const data = await response.json();
  console.log(data.data);
}

// Submit lead
async function submitLead(leadData) {
  const response = await fetch('/api/leads/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  });
  const result = await response.json();
  console.log(result);
}

// Usage
submitLead({
  fullName: "Jane Smith",
  email: "jane@example.com",
  phone: "9876543210",
  state: "Mumbai",
  courseInterested: "MBA - Business Administration",
  intakeYear: "2025",
  consent: true
});
```

## Pipedream Webhook Testing

When form is submitted, it automatically sends to Pipedream:

**Webhook Data Format:**
```json
{
  "id": "1699999999999",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Delhi",
  "courseInterested": "B.Tech - Computer Science & Engineering",
  "intakeYear": "2025",
  "consent": true,
  "submittedAt": "2024-11-12T10:00:00.000Z",
  "source": "Landing Page"
}
```

## Rate Limiting

Currently: **No rate limiting** (add as needed for production)

To add rate limiting, install:
```bash
npm install express-rate-limit
```

## CORS Settings

All endpoints support CORS headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST`
- `Access-Control-Allow-Headers: Content-Type`

---

**Need Help?**
- Check server console for detailed error messages
- Enable browser DevTools (F12) Network tab
- Check .env configuration
- Verify Pipedream webhook URL
