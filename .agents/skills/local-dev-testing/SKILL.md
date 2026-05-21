---
name: local-dev-testing
description: How to run and test the MERN Todo List app locally (MongoDB, Express backend, React frontend)
---

## Local Development Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running on `mongodb://0.0.0.0:27017/youtubeMern`

### Start MongoDB
```bash
mongod --dbpath /tmp/mongodb-data --bind_ip 0.0.0.0 &
```

### Install & Start Backend (port 5000)
```bash
cd backend && npm install && node index.js &
```

### Install & Start Frontend (port 3000)
```bash
cd frontend/mernapp && npm install && npm start &
```

## Testing Flow

1. **Signup**: Navigate to `http://localhost:3000/signup`, fill in name/email/password/confirm password
2. **Login**: Navigate to `http://localhost:3000/login`, enter email and password
3. **Add Todo**: Fill in Title and Task fields, click "Add Note"
4. **Edit Todo**: Click edit icon, modify fields in modal, click "Update Note"
5. **Delete Todo**: Click trash icon to remove a todo
6. **Verify Date Column**: After adding a todo, confirm the Date column shows today's date in locale format (e.g., "5/21/2026")

## Key Architecture
- Backend routes: `backend/routes/Auth.js` (signup/login), `backend/routes/TodoTask.js` (CRUD)
- Frontend components: `frontend/mernapp/src/components/Todos.js` (table), `Todoitem.js` (row)
- State management: `frontend/mernapp/src/context/todoState.js` (React Context API)
- Auth: JWT tokens stored in `localStorage` as `token`, sent via `auth-token` header
