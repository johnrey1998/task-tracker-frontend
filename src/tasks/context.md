# Tasks Domain (`src/tasks/`)

## FastAPI Alignment

Maps directly to backend endpoints under `/api/v1/tasks/`:

- `GET /api/v1/tasks/` (List authenticated user's tasks)
- `POST /api/v1/tasks/` (Create task)
- `GET /api/v1/tasks/{task_id}` (Get specific task)
- `PATCH /api/v1/tasks/{task_id}` (Update task)
- `DELETE /api/v1/tasks/{task_id}` (Delete task)

## Key Files

- `task.ts`: TypeScript interfaces (`TaskCreate`, `TaskUpdate`, `TaskResponse`).
- `taskService.ts`: CRUD API wrappers using `fetchClient`.
