# Task Tracker Frontend

A modern, responsive React frontend for the Task Tracker API, built with Vite+ (`vp`), Tailwind CSS.

## Tech Stack

- **React**
- **Vite+ (`vp`)** (Build toolchain & asset bundling)
- **Tailwind CSS** (Utility-first styling)

## Getting Started

### Prerequisites

- Vite+ (`vp`)

### Local Development

1. Install dependencies:

   ```bash
   vp install
   ```

2. Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. Start the development server:
   ```bash
   vp dev
   ```

## Docker Deployment

Build and run the production container using Docker Compose:

```bash
docker compose up --build -d
```
