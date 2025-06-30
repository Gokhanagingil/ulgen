# gokhan

Minimal ITSM + GRC starter project using NestJS and React.

## Structure
- `/backend` - NestJS server
- `/frontend` - React app with Vite and Tailwind
- `/database/schema.sql` - sample database initialization

## Getting Started
1. Create a `.env` file based on `.env.example`.
2. Run database migrations or load `schema.sql`.
3. Install dependencies in both `backend` and `frontend`.
4. Start the backend and frontend development servers.
   - `cd backend && npm install && npm run start:dev`
   - `cd frontend && npm install && npm run dev`
   - Or simply run `./scripts/start.sh` and `./scripts/stop.sh` to manage both
     servers together.

