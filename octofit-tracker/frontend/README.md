# Octofit Frontend

This React 19 app uses Vite and react-router-dom to render users, activities, teams, leaderboard, and workouts from the backend API.

## Environment Variable

Define VITE_CODESPACE_NAME to target your Codespaces backend URL.

Example .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When VITE_CODESPACE_NAME is set, component endpoints resolve to:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

When VITE_CODESPACE_NAME is not set, the app safely falls back to:

http://localhost:8000/api/[component]/
