# Accounting & Consulting Website (Vite + React + Express)

Frontend: Vite + React  
Backend: Express upload API (used via Vite proxy at `/api`)

## Requirements
- Node.js (recommended: 18+)
- npm

## Setup
Install dependencies:

```bash
npm install
```

Create your env file:

```bash
copy .env.example .env
```

## Run (development)
Start **frontend + API server** together:

```bash
npm run dev:both
```

Or run separately:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

- Frontend: `http://localhost:5173`
- API server: `http://localhost:3001`
- Health check: `http://localhost:3001/api/health`

## Build (production)
Build the frontend:

```bash
npm run build
```

Start the production server (serves `dist/` when `NODE_ENV=production`):

```bash
npm run start
```

## Environment variables
See `.env.example` for the full list. Common ones:
- `PORT`: API server port (default `3001`)
- `UPLOAD_DIR`: upload folder (default `public/uploads`)
- `MAX_FILE_SIZE`: max upload size in bytes
- `CORS_ORIGIN`: allowed origin(s) for API

## Notes
- Do not commit `.env` or `node_modules/` (they are ignored via `.gitignore`).

