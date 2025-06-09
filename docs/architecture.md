# Ülgen Architecture

Ülgen is a modular ITSM and GRC platform built with NestJS, React and PostgreSQL.

## Backend
- **NestJS** REST API
- **TypeORM** for database access
- **Swagger** for API docs
- **Modules** directory contains domain modules such as `to_do`.

## Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- Connects to backend using Axios

## Database
- PostgreSQL schema under `database/schema.sql`
- Example `.env` file provided for environment variables

Future modules will include ticket management, CMDB, risk register and more.
