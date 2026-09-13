# Arogyam Backend

This is a beginner-friendly REST API for the Arogyam yoga frontend.

## Stack

- Node.js + Express: web server/API
- MongoDB + Mongoose: database
- JWT: login sessions/authentication
- bcryptjs: password hashing
- CORS: allows the frontend to call the API

## 1. Install Node.js

Install a current LTS version of Node.js.

Then open a terminal inside this `arogyam_backend` folder.

## 2. Install dependencies

```bash
npm install
```

## 3. Configure MongoDB

### Local MongoDB
Install MongoDB locally and make sure the MongoDB service is running.

Copy `.env.example` to `.env` and use:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/arogyam
JWT_SECRET=put-a-long-random-secret-here
CLIENT_URL=http://127.0.0.1:5500
PORT=5000
```

### MongoDB Atlas
Instead of the local URI, put your Atlas connection string into `MONGODB_URI`.

Do not upload `.env` to GitHub.

## 4. Insert sample courses

```bash
node seed.js
```

## 5. Start the backend

Development:

```bash
npm run dev
```

Or:

```bash
npm start
```

You should see:

```text
MongoDB connected
Arogyam API running at http://localhost:5000
```

Test:

```text
http://localhost:5000/api/health
```

## API

### Authentication

`POST /api/auth/signup`

Body:

```json
{
  "name": "Gaurav",
  "email": "you@example.com",
  "password": "password123"
}
```

`POST /api/auth/login`

Body:

```json
{
  "email": "you@example.com",
  "password": "password123"
}
```

`GET /api/auth/me`

Requires:

```text
Authorization: Bearer YOUR_TOKEN
```

### Courses

`GET /api/courses`

Optional filters:

`GET /api/courses?access=FREE`

`GET /api/courses?level=Beginner`

### Progress

`GET /api/progress`

Requires login.

`POST /api/progress/:courseId`

Example body:

```json
{
  "completedClasses": 5,
  "percentage": 68
}
```

### Live classes

`GET /api/live`

`POST /api/live/:id/reserve`

Requires login.

## Connecting your uploaded frontend

Your current frontend already has login and signup screens, but their buttons are demo-only: they directly call `showPage('profile')` and `toast(...)` rather than sending credentials to a server.

Replace those button handlers with calls to the functions in `frontend-api.js`.

For example:

```js
async function handleLogin() {
  try {
    const user = await loginUser(email, password);
    showPage("profile");
    toast(`Welcome back, ${user.name}.`);
  } catch (error) {
    toast(error.message);
  }
}
```

The same idea applies to signup.

## Important production upgrades

This starter backend is intentionally simple for learning. Before launching a real paid app, add:

- email verification
- password reset
- rate limiting
- stronger validation
- HTTPS
- secure cookie-based sessions or carefully designed token storage
- payment gateway + server-side payment verification
- premium subscription/ownership model
- video storage/streaming
- admin dashboard
- instructor accounts
- database backups
- logging/monitoring
- privacy policy and terms
- secure CORS configuration

Do not store plain-text passwords. This backend stores bcrypt hashes instead.
