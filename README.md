# Ülgen

Ülgen is a modern ITSM and GRC platform. This repository contains a minimal
MVP with a ToDo module to demonstrate the stack.

## Project Structure

```
ulgen/
├── backend/      NestJS API
├── frontend/     React client (Vite + Tailwind)
├── database/     SQL schema
├── docs/         Architecture notes
```

## Development

### Backend
1. `cd backend`
2. Install deps with `npm install`
3. Copy `.env.example` to `.env` and configure the `DB_*` variables
4. Run with `npm run start:dev`

The API will start on `http://localhost:3000` and Swagger docs are available at
`http://localhost:3000/api`.

### Frontend
1. `cd frontend`
2. Install deps with `npm install`
3. Run the dev server with `npm run dev`

The app will be served on `http://localhost:5173`.

## Environment Variables
See `.env.example` for required variables such as `DB_HOST`, `DB_PORT`,
`DB_USERNAME`, `DB_PASSWORD` and `DB_NAME`.
