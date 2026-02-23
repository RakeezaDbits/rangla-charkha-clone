const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const AUTH_TOKEN_KEY = "auth_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const url = path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path: string) => apiFetch(path),
  post: (path: string, body?: unknown) => apiFetch(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: (path: string, body?: unknown) => apiFetch(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: (path: string) => apiFetch(path, { method: "DELETE" }),
};
