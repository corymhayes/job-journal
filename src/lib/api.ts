import { authClient } from "../worker/auth";

export const api = {
  request: async (endpoint: string, options: RequestInit = {}) => {
    const { data } = await authClient.getSession();

    const token = data?.session?.token;

    if (!token) {
      throw new Error("No active session");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(`${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) throw new Error("API Request Failed");

    return response.json();
  },
};
