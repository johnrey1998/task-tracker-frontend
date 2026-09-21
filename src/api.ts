const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth = false, headers, ...customOptions } = options;

  const token = localStorage.getItem("access_token");

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!skipAuth && token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...customOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "An unexpected error occured");
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
