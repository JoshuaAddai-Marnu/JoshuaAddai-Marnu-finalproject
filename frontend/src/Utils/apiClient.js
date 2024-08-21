import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("JB_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., logout)
      // You might want to implement a logout function here
    }
    return Promise.reject(error);
  }
);

export class ApiClient {
  static async get(url, params) {
    const response = await apiClient.get(url, { params });
    return response.data;
  }

  static async post(url, data, options = {}) {
    const config = {
      ...options,
      headers: {
        ...apiClient.defaults.headers,
        ...options.headers,
      },
    };
    const response = await apiClient.post(url, data, config);
    return response.data;
  }

  static async put(url, data) {
    const response = await apiClient.put(url, data);
    return response.data;
  }

  static async patch(url, data) {
    const response = await apiClient.patch(url, data);
    return response.data;
  }

  static async delete(url) {
    const response = await apiClient.delete(url);
    return response.data;
  }
}
