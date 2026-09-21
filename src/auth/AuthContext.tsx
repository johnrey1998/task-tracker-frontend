import React, { createContext, useContext, useState } from "react";
import type { LoginRequest, UserCreateDto, TokenResponse, UserResponse } from "./auth";
import { authService } from "./authService";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<TokenResponse>;
  register: (data: UserCreateDto) => Promise<UserResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("access_token"));

  const isAuthenticated = Boolean(token);

  const login = async (credentials: LoginRequest): Promise<TokenResponse> => {
    const response = await authService.login(credentials);
    setToken(response.access_token);
    return response;
  };

  const register = async (data: UserCreateDto): Promise<UserResponse> => {
    return await authService.register(data);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
