import { fetchClient } from "@/api";

import type { LoginRequest, TokenResponse, UserCreateDto, UserResponse } from "./auth";

export const authService = {
  async register(data: UserCreateDto): Promise<UserResponse> {
    return fetchClient<UserResponse>("/users/", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const data = await fetchClient<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      skipAuth: true,
    });

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }
    return data;
  },

  logout(): void {
    localStorage.removeItem("access_token");
  },
};
