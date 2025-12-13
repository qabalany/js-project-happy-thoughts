# Happy Thoughts

A React app where users can share positive thoughts and like others' posts.

## Features

- Post happy thoughts (5-140 characters)
- Like thoughts with a heart button
- Real-time data with Supabase
- Character counter with validation
- Keyboard accessible (Tab navigation, focus states)
- Screen reader friendly (aria-labels, aria-live)

## Tech

- React + Vite
- Styled Components
- Supabase (Database + API)

## The Problem

The original Technigo API was down (503 Service Unavailable), so I built my own backend using Supabase. This was a good learning experience - I learned how to set up a database, configure API keys, and handle Row Level Security policies.

## Accessibility

- Semantic HTML (`<main>`, `<article>`, `<section>`)
- Labels connected to inputs
- Visible focus states for keyboard users
- aria-labels on interactive elements
- aria-live regions for dynamic content

## Run locally

```bash
npm install
npm run dev
```

## View it live

[Live Demo](http://h.fartist.live)