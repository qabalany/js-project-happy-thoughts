# Happy Thoughts

A React app where users share short happy messages, like each other's thoughts, and manage their posts.

**Live:** https://h.fartist.live

**Backend:** [js-project-api](https://github.com/Qabalany/js-project-api)

## Tech

React 19, Vite 6, styled-components, JWT auth, localStorage

## Features

- Post thoughts (5–140 characters) with character counter
- Like thoughts with a heart button
- Sign up / Log in / Log out (JWT token)
- Edit and delete your own thoughts
- Anonymous posting (no login required)
- Sort by date or hearts
- Filter by minimum hearts
- Pagination (Prev/Next)
- "My Likes" filter

## Project Structure

```
src/
├── App.jsx              # Main component — state, handlers, API calls
├── main.jsx             # Entry point
├── index.css            # Global styles
└── components/
    ├── AuthForm.jsx     # Login/Signup form
    ├── ThoughtForm.jsx  # New thought input
    ├── ThoughtList.jsx  # List of thoughts
    └── ThoughtCard.jsx  # Single thought card
```

## Run Locally

```bash
npm install
npm run dev
```

## View It Live

https://h.fartist.live