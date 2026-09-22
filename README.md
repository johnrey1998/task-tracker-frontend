# Task Tracker Frontend

A React frontend for the [Task Tracker API](https://github.com/johnrey1998/task-tracker-api), built with Vite+ (`vp`), Tailwind CSS.

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

2. Create your environment file from the example:

   ```bash
   cp .env.example .env
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
