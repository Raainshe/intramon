# Intramon

Full-stack application with Vue.js frontend and Node.js backend with MongoDB.

## Quick Start with Docker

The easiest way to run the entire application is using Docker Compose:

```bash
docker compose up
```

This will start:
- **MongoDB** on port 27017
- **Backend API** on port 3000 (with hot reloading)
- **Frontend** on port 8080 (with hot reloading via Vite)

Access the application at: http://localhost:8080

### Hot Reloading

The Docker setup includes hot reloading for both frontend and backend:
- **Backend**: Uses `node --watch` to automatically restart on file changes
- **Frontend**: Uses Vite's HMR (Hot Module Replacement) for instant updates
- Source code is mounted as volumes, so changes are reflected immediately

### Docker Commands

- Start services: `docker compose up`
- Start in background: `docker compose up -d`
- Stop services: `docker compose down`
- View logs: `docker compose logs -f`
- Rebuild images: `docker compose up --build`
- View specific service logs: `docker compose logs -f backend` or `docker compose logs -f frontend`

## Manual Setup

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (see `.env.example`)

4. Start the server:
```bash
npm run dev
```

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
intramon/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # Vue.js + TypeScript + Vite
└── docker-compose.yml
```