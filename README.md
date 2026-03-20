# Louder AI - Event Planning with AI

Plan your next trip or event using AI-powered recommendations. Just describe what you want, and get personalized suggestions instantly.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites

Before you start, make sure you have:
- **Node.js** (v18+) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - OR Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free account)
- **Google Gemini API Key** - [Get free key](https://aistudio.google.com/)
- **Git** - [Download Git](https://git-scm.com/)

---

## 📋 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Louder_AI.git
cd Louder_AI
```

### Step 2: Setup Backend (Terminal 1)

**Navigate to server folder:**
```bash
cd server
npm install
```

**Create `.env` file** (copy-paste this):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/louder_ai
JWT_SECRET=your_super_secret_key_min_32_characters_long_here
GEMINI_API_KEY=paste_your_google_gemini_api_key_here
```

**Start MongoDB** (in a new terminal, if using local):
```bash
mongod
```

**Start backend server:**
```bash
node server.js
```

✅ You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

---

### Step 3: Setup Frontend (Terminal 2)

**Navigate to client folder:**
```bash
cd client
npm install
```

**Start frontend:**
```bash
npm run dev
```

✅ You should see:
```
VITE v8.0.1  ready in 234 ms

➜  Local:   http://localhost:5173/
```

---

## 🎮 Test the App

1. **Open** `http://localhost:5173` in your browser
2. **Sign Up** with any email and password
3. **Try it:**
   ```
   Example: "3-day trip to Goa for 2 people, ₹15,000 budget, love beaches"
   ```
4. **Click Generate** → AI will create a personalized plan in 2-5 seconds

---

## 🛠️ Setup Troubleshooting

### MongoDB won't start?

**Windows/Local MongoDB:**
```bash
# If you installed MongoDB, it should run with:
mongod
```

**If using MongoDB Atlas (Cloud):**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database cluster
3. Get connection string
4. Replace in `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/louder_ai
   ```

### Backend won't start?

```bash
# Check if port 5000 is free
# If in use, change PORT in .env to 5001

# Check Node version
node --version  # Should be v18+

# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't start?

```bash
# Check if port 5173 is free
# Vite will auto-use next available port

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

npm run dev
```

### Can't login or signup?

1. Check backend is running (`http://localhost:5000` should load)
2. Check browser console (F12) for errors
3. Clear localStorage:
   - F12 → Application → Local Storage → Clear All
   - Try signing up again

### AI is giving generic responses?

This means Gemini API is rate-limited. Check backend logs for `429` or `RATE_LIMIT` errors.

**Solutions:**
- Wait 1-2 hours (free tier resets)
- Use different API key
- Upgrade to paid plan

---

## 📂 Project Structure

```
Louder_AI/
├── server/               # Backend (Express.js)
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Database schemas
│   │   └── services/    # AI integration
│   ├── .env             # Configuration
│   └── server.js        # Start server
│
├── client/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/      # Login, Signup, Home
│   │   ├── components/ # UI components
│   │   └── api/        # API client
│   └── vite.config.js
│
└── README.md           # This file
```

---

## 🔑 Environment Variables

### Backend `.env`

| Variable | Where to get | Example |
|----------|-------------|---------|
| `PORT` | Choose any free port | `5000` |
| `MONGO_URI` | MongoDB Atlas connection | `mongodb://localhost:27017/louder_ai` |
| `JWT_SECRET` | Generate any 32+ char string | `your_secret_key_here` |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) | `AIzaSy...` |

---

## 🌐 How It Works

1. **You enter a trip description** (e.g., "Goa trip for 2 people, ₹15k budget")
2. **Backend sends to Gemini AI** with your query
3. **AI generates** venue, location, cost, highlights, and tips
4. **Result shows on screen** with all details
5. **Saved to your history** for later

---

## 🚢 Deploy to Production

### Frontend → Vercel

```bash
cd client
npm run build
vercel  # Follow prompts
```

### Backend → Render or Railway

1. Push code to GitHub
2. Connect repo to [Render](https://render.com) or [Railway](https://railway.app)
3. Add environment variables in dashboard
4. Deploy

---

## 🆘 Still Having Issues?

### Check these first:

- [ ] Both `npm install` commands completed without errors
- [ ] MongoDB is running (check `mongod` terminal)
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend shows "Local: http://localhost:5173"
- [ ] Can access `http://localhost:5173` in browser
- [ ] `.env` file exists in `server/` with all 4 variables
- [ ] Google Gemini API key is valid

### Common Errors:

| Error | Fix |
|-------|-----|
| "Cannot find module" | Run `npm install` in that folder |
| "Port already in use" | Change PORT in `.env` |
| "MongoDB connection failed" | Start MongoDB or update MONGO_URI |
| "API key undefined" | Check `.env` file exists and has GEMINI_API_KEY |
| "CORS error" | Restart backend after changes |

---

## 📚 Learn More

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Gemini API Docs](https://ai.google.dev)

---

## 📝 License

MIT

---

**Happy planning! 🚀✈️**

│   │   └── index.css        # Tailwind + custom styles
│   ├── package.json
│   └── README.md            # Frontend documentation
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # AI integration
│   │   ├── middlewares/     # Auth, errors
│   │   └── utils/           # Helpers
│   ├── scripts/             # Utility scripts
│   ├── server.js            # Entry point
│   ├── .env                 # Environment config
│   ├── package.json
│   └── README.md            # Backend documentation
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **Google Gemini API Key** ([Get free key](https://aistudio.google.com/))
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/Louder_AI.git
cd Louder_AI
```

### Step 2: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/louder_ai
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
GEMINI_API_KEY=your_google_gemini_api_key_here
EOF

# Start MongoDB (if running locally)
mongod  # in a separate terminal

# Start backend server
node server.js
```

Server will start at `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at `http://localhost:5173`

### Step 4: Test the App

1. Open `http://localhost:5173` in your browser
2. **Sign Up** with an email and password
3. **Enter a trip description**, e.g.:
   - "3-day trip to Goa for 2 people, ₹15,000 budget, love beaches"
   - "Mountain trek in Himachal Pradesh for 5 people"
   - "Heritage tour of Rajasthan"
4. Click **Generate plan**
5. View AI-generated recommendations

## 🔑 Key Features

### For Users
- ✅ Sign up and secure login
- ✅ Describe trip in natural language
- ✅ Get AI-powered recommendations in seconds
- ✅ View detailed event plans with cost, venue, highlights, and tips
- ✅ Access history of all planned trips
- ✅ Context-aware suggestions based on search history

### For Developers
- ✅ Modern React + Vite setup
- ✅ Express.js REST API
- ✅ MongoDB database integration
- ✅ JWT-based authentication
- ✅ Google Gemini AI integration
- ✅ Error handling and validation
- ✅ CORS-enabled for frontend communication
- ✅ Modular project structure

## 📚 Documentation

### For Frontend Developers
See [client/README.md](./client/README.md) for:
- Installation instructions
- Project structure
- Component documentation
- Deployment guide
- Troubleshooting

### For Backend Developers
See [server/README.md](./server/README.md) for:
- Setup and installation
- API endpoints documentation
- Database schema
- Gemini AI integration
- Deployment guide
- Performance optimization

## 🔄 How It Works

### User Journey

```
1. Sign Up
   └─→ User creates account (email + password)
   └─→ Password hashed with bcryptjs
   └─→ User stored in MongoDB

2. Login
   └─→ Credentials verified
   └─→ JWT token generated (7-day expiration)
   └─→ Token stored in browser localStorage

3. Generate Event Plan
   └─→ User enters trip description
   └─→ Frontend sends query to /api/events/generate
   └─→ Backend sends to Gemini AI with structured prompt
   └─→ AI returns JSON: {venueName, location, cost, highlights, tips}
   └─→ Event saved to MongoDB
   └─→ Result displayed on frontend

4. View History
   └─→ User can click past trips
   └─→ Events fetched from /api/events/my
   └─→ Previous recommendations displayed
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React 19 | UI framework |
| | Vite | Build tool |
| | Tailwind CSS | Styling |
| | Axios | HTTP client |
| **Backend** | Express.js | Server framework |
| | Node.js | Runtime |
| | MongoDB | Database |
| | JWT | Authentication |
| | bcryptjs | Password hashing |
| **AI** | Google Gemini 2.5 Flash | Event planning |
| **Utilities** | dotenv | Environment config |

## 📊 API Overview

### Authentication Endpoints
```
POST   /api/auth/signup       → Register new user
POST   /api/auth/login        → Login & get JWT token
POST   /api/auth/logout       → Logout user
```

### User Endpoints
```
GET    /api/user/profile      → Get user profile
```

### Event Endpoints
```
POST   /api/events/generate   → Generate AI event plan
GET    /api/events/my         → Get user's event history
POST   /api/events/create     → Create event manually
```

**Full API documentation available in [server/README.md](./server/README.md)**

## 🔐 Security

- ✅ Passwords hashed with bcryptjs (12 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected routes require valid token
- ✅ API keys stored in `.env` (not in code)
- ✅ CORS configured for frontend origin
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive info

## 🚢 Deployment

### Deploy Frontend to Vercel
```bash
cd client
vercel
```

### Deploy Backend to Heroku/Railway
```bash
# Push to GitHub first
git push origin main

# Connect repo to Heroku/Railway/Render
# Set environment variables in dashboard
# Deploy
```

**See [client/README.md](./client/README.md) and [server/README.md](./server/README.md) for detailed deployment guides.**

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in `server/src/app.js`
- Clear browser cache (Ctrl+Shift+Del)

### "Unauthorized" error on events
- Check token is stored in localStorage
- Try logging in again
- Token may have expired (7 days)

### AI responses are generic
- Verify Gemini API key is correct
- Check backend logs for API errors
- Run `node server/scripts/list_gemini_models.js` to verify models

### MongoDB connection error
- Ensure MongoDB is running: `mongod`
- Or update `MONGO_URI` to MongoDB Atlas cloud
- Check connection string in `.env`

See detailed troubleshooting in individual README files.

## 📈 Performance Metrics

- **Frontend Load Time**: < 2s (Vite + lazy loading)
- **AI Response Time**: 2-5s (Gemini API)
- **Database Query Time**: < 100ms (MongoDB indexes)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Vite Guide](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev)

## 🙋 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review [client README](./client/README.md) or [server README](./server/README.md)
3. Check existing GitHub issues
4. Create a new issue with detailed description

## 🎉 Acknowledgments

- Google Generative AI team (Gemini API)
- MongoDB for database
- Vercel for frontend hosting
- Open source community

---

**Happy planning! 🚀✈️🏖️**
