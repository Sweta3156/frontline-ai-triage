# MERN Hackathon Starter

Ready-to-use MERN boilerplate: JWT auth (signup/login) + reusable UI components (Form, Modal, Table, Navbar).

## Setup (do this BEFORE hackathon day, test it once so npm caches packages)

### Backend
```
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI / JWT_SECRET if needed
npm run dev                # starts on http://localhost:5000
```

### Frontend
```
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Frontend is already proxied to backend (`/api/*` -> `localhost:5000`), so axios calls like `api.post('/auth/login', ...)` just work.

## What's inside

- **backend/models/User.js** — Mongoose user schema with bcrypt password hashing
- **backend/routes/authRoutes.js** — `/api/auth/signup`, `/api/auth/login`, `/api/auth/me` (protected)
- **backend/middleware/authMiddleware.js** — JWT verification middleware (`protect`)
- **frontend/src/context/AuthContext.jsx** — global auth state + axios instance with token auto-attached
- **frontend/src/components/Form.jsx** — generic form, just pass a `fields` array
- **frontend/src/components/Modal.jsx** — generic modal
- **frontend/src/components/Table.jsx** — generic data table with optional row click + custom cell render
- **frontend/src/components/Navbar.jsx** — navbar with login/logout state

## Hackathon-day usage

1. Once problem statement is announced, decide your core entity (e.g. "Ticket", "Expense", "Post")
2. Copy `User.js` model as a template for your new model
3. Copy `authRoutes.js` pattern for your new CRUD routes, use `protect` middleware where needed
4. Use `Table` to list your entity, `Modal` for create/edit forms, `Form` for the actual inputs
5. Skip styling polish until MVP works — the components have minimal inline styles, good enough for a demo

## Before you leave for the venue

- [ ] Run `npm install` in both folders at least once (so it's cached, works offline/on slow wifi)
- [ ] Confirm MongoDB connection works (local mongod OR Atlas with IP whitelist set to 0.0.0.0/0 for venue wifi)
- [ ] Test signup + login flow end-to-end once
