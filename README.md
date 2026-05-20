# Construction Project Management Portal

A full-stack portal for construction companies to manage project timelines, procurement, costs, tasks, progress photos, and client reports.

## Stack
- Frontend: React, React Router, Vite
- Backend: Node.js, Express
- Database: PostgreSQL
- Charts: Recharts
- Media: Cloudinary
- PDF Export: jsPDF

## Structure
- `backend/` - Express API, controllers, services, PostgreSQL schema
- `frontend/` - React app with dashboard pages and reusable components

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `backend/.env` from `.env.example` and configure values
4. Create the PostgreSQL database and run the SQL schema in `src/db/schema.sql`
5. Run `npm run seed:user` to create or reset the default admin login
6. `npm run dev`

Default seeded login:
- Email: `admin@example.com`
- Password: `Password123!`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Notes
- The backend includes role-aware routes for admins, project managers, engineers, accountants, and clients.
- The frontend includes a dashboard, project pages, procurement, task board, photo uploads, finance, and reports.
- Use Cloudinary credentials in `.env` and connect PostgreSQL with `DATABASE_URL`.
