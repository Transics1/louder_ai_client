# Louder AI - Client

A modern React-based frontend for the Louder AI event planning application. Uses Vite for fast development and Tailwind CSS for styling.

## Features

- **User Authentication** - Sign up and login with JWT tokens
- **Event Planning** - Describe your trip and get AI-powered recommendations
- **Smart Suggestions** - Context-aware suggestions based on search history
- **Trip History** - View and manage your previous trip plans
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Hooks

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see `../server/README.md`)

## Installation

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configure Environment

Create a `.env.local` file (optional - default backend is `http://localhost:5000/api`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
src/
├── pages/
│   ├── Login.jsx          # Login page
│   ├── Signup.jsx         # Signup page
│   └── Home.jsx           # Main event planning page
├── components/
│   ├── ResultCard.jsx     # Displays AI-generated event plan
│   ├── History.jsx        # Shows previous trips
│   └── DotGrid.jsx        # Background decoration
├── api/
│   └── axios.js           # API client with auth interceptor
├── App.jsx                # Main app component
├── index.css              # Global styles
└── main.jsx               # Entry point
```

## How It Works

### 1. **Authentication Flow**
   - User signs up with email and password
   - Credentials are hashed on the backend
   - JWT token is returned and stored in `localStorage`
   - Token is automatically included in all API requests

### 2. **Event Generation**
   - User enters a trip description (e.g., "3-day trip to Goa for 2 people, ₹15,000 budget")
   - Backend sends query to Gemini AI API
   - AI returns structured JSON with: venue name, location, estimated cost, highlights, tips
   - Result is displayed in the ResultCard component
   - Event is saved to user's history

### 3. **History Management**
   - All generated plans are fetched from `/events/my` endpoint
   - Users can click on past trips to view them again
   - Context-aware suggestions update based on search history

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API URL |

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
- Ensure backend server is running on `http://localhost:5000`
- Check backend has CORS enabled in `src/app.js`

### Auth token not working
- Clear `localStorage`: Open DevTools (F12) → Application → Local Storage → Clear
- Log in again to get a fresh token

### Build fails
```bash
npm run lint  # Check for linting errors
npm run build -- --debug  # See detailed build output
```

## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Using Vercel CLI
npm install -g vercel
vercel
```

## API Integration

The client communicates with the backend API at `/api`:

### Key Endpoints Used

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile
- `POST /api/events/generate` - Generate event plan with AI
- `GET /api/events/my` - Get user's event history

See [backend README](../server/README.md) for full API documentation.

## Performance Tips

- Enable production build caching
- Use React DevTools to identify unnecessary re-renders
- Lazy load components for better code splitting

## Contributing

This is a personal project. Feel free to fork and modify!

## License

MIT
