# Auth Domain (`src/auth/`)

## FastAPI Alignment

Maps directly to backend endpoints:

- `POST /api/v1/users/` (Registration)
- `POST /api/v1/auth/login` (JWT authentication)

## Key Files

- `auth.ts`: TypeScript interfaces mirroring Pydantic schemas (`LoginRequest`, `TokenResponse`, `UserCreate`, `UserResponse`).
- `authService.ts`: Encapsulates login, register, and logout logic using `fetchClient` or standard `fetch` (for form-urlencoded login if required by OAuth2 password flow).
- `AuthContext.tsx`: React Context providing global session state (`user`, `token`, `isAuthenticated`, `login`, `logout`).
