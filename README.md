# Noted. — Full Stack Notes App

## Stack
- **Frontend**: React + Vite + CSS Modules (nginx)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (AWS RDS)
- **Deploy**: Docker + AWS ECS

## Folder Structure
```
noted-fullstack/
├── client/               ← React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotesApp.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── NoteEditor.jsx
│   │   ├── styles/
│   │   ├── api.js        ← API calls to backend
│   │   ├── constants.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── server/               ← Express backend
│   ├── routes/
│   │   └── notes.js      ← CRUD API routes
│   ├── db.js             ← PostgreSQL connection
│   ├── server.js         ← Entry point
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml    ← Run both together
```

## Setup

### 1. Configure environment
```bash
cp server/.env.example server/.env
# Fill in your RDS credentials
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```

### 3. Deploy to ECS
- Build & push `client` and `server` images to ECR separately
- Create two ECS task definitions (frontend + backend)
- Or combine into one task with two containers

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create note |
| PUT | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |
| GET | /health | Health check |
