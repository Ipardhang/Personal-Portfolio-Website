# Personal Portfolio Website

A full-stack personal portfolio with a responsive frontend, MongoDB-backed project content, and a protected contact workflow.

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- HTML, CSS, JavaScript

## Features

- Responsive portfolio UI
- Project catalogue with technology, category, description, and links
- Contact form with validation and rate limiting
- Admin-protected project creation endpoint
- MongoDB persistence

## Run locally

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/personal-portfolio
ADMIN_KEY=replace-with-a-strong-random-key
PORT=3000
```

Then:

```bash
npm start
```

Open `http://localhost:3000`.

## API

- `GET /api/projects`
- `POST /api/projects` — requires the configured admin key
- `POST /api/contact`

## Security

Keep `.env` and administrative secrets out of Git. The contact endpoint validates input and limits repeated submissions.
