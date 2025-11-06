# Backend API

Node.js backend with Express and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/intramon
NODE_ENV=development
```

4. Make sure MongoDB is running on your system.

## Running

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns the health status of the API and database connection
  - Response includes: status, timestamp, uptime, database connection status, environment

## MongoDB

The backend connects to MongoDB using Mongoose. Make sure MongoDB is installed and running before starting the server.

For local development, you can use:
- Local MongoDB installation
- MongoDB Atlas (cloud)
- Docker: `docker run -d -p 27017:27017 mongo`

