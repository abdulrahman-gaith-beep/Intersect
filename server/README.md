# Intersect OS Backend API

A Node.js/Express backend server providing mock API endpoints for the Intersect OS platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or run in development mode with auto-reload
npm run dev
```

The server will start on `http://localhost:3001`

## Demo Credentials

- **Email:** demo@techcorp.com
- **Password:** demo123

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| GET | `/api/services/:id` | Get service by ID |
| POST | `/api/services/:id/launch` | Launch automated service |
| POST | `/api/services/:id/request` | Request advisory service |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/documents` | List all documents |
| POST | `/api/documents/upload` | Upload a document |
| GET | `/api/documents/:id/download` | Get download link |

### Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | Get market entry progress |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | List notifications |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |

### Team
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | List team members |

### Support & Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/support/request` | Submit support ticket |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/demo/request` | Request a demo |

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/stats` | Public statistics |

## Example Requests

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@techcorp.com", "password": "demo123"}'
```

### Get Services
```bash
curl http://localhost:3001/api/services
```

### Launch a Service
```bash
curl -X POST http://localhost:3001/api/services/1/launch \
  -H "Content-Type: application/json"
```

### Get Progress
```bash
curl http://localhost:3001/api/progress
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |

## Running with Frontend

To run the full stack:

1. Start the backend:
```bash
cd server
npm install
npm start
```

2. In a new terminal, start the frontend:
```bash
cd app
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and will connect to the backend at `http://localhost:3001`.

## Deployment

This server can be deployed to:
- **Heroku**: Add a `Procfile` with `web: node index.js`
- **Railway**: Just push to a connected repository
- **Render**: Create a new Web Service pointing to the `/server` directory
- **DigitalOcean App Platform**: Use the Node.js buildpack
