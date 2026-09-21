# API Client Architecture (`src/api.ts`)

## Overview

`src/api.ts` provides a centralized generic `fetchClient<T>` wrapper for communicating with the FastAPI backend (`/api/v1`).

## Conventions

- **Base URL:** Defaults to `http://localhost:8000/api/v1`, configurable via `VITE_API_BASE_URL`.
- **Authentication:** Automatically injects `Authorization: Bearer <token>` from `localStorage` (`access_token`) unless `skipAuth: true` is passed in options.
- **Error Handling:** Parses FastAPI error responses (looking for `detail`) and throws standard JavaScript `Error` objects. Handles `401 Unauthorized` by clearing tokens and redirecting to `/login`.
- **No Content:** Automatically returns empty objects `{}` on `204 No Content` responses.
