import axios from "axios";

import {
  ShortLinkUnreistered,
  CreateLinkRequest,
  SignupResponse,
  RegisteredLink,
  CreateRegisteredLinkResponse,
  SigninResponse,
} from "./types";

const API_BASE_URL = "https://url-shortener-backend-yk3p.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: any
  ) {
    super(message);
  }
}

const handleApiError = (error: any): ApiError => {
  if (error instanceof error.response) {
    const { status, data } = error.response;
    return new ApiError(
      status,
      data.message || "An error occurred",
      data.errors
    );
  }
  return new ApiError(500, "An unexpected error occurred");
};

export const urlShortenerApi = {
  createShortLinkUnregistered: async (
    data: CreateLinkRequest
  ): Promise<ShortLinkUnreistered | undefined> => {
    try {
      const response = await api.post<ShortLinkUnreistered>(
        "/unregistered-link",
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  signup: async (email: string, password: string): Promise<SignupResponse> => {
    try {
      const response = await api.post<SignupResponse>("/signup", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  signin: async (email: string, password: string): Promise<SigninResponse> => {
    try {
      const response = await api.post<SignupResponse>("/signin", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createRegisteredLink: async (
    link: string
  ): Promise<CreateRegisteredLinkResponse> => {
    console.log(link);

    try {
      const response = await api.post<CreateRegisteredLinkResponse>(
        "/registered-link",
        { link }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRegisteredLinks: async (): Promise<RegisteredLink[]> => {
    console.log("Attempting to fetch registered links...");
    try {
      const response = await api.get<{ links: RegisteredLink[] }>("/all-links");
      console.log("Response data:", response.data);
      return response.data.links;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteRegisteredLink: async (shortCode: string): Promise<void> => {
    try {
      await api.delete(`/registered-link/${shortCode}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default urlShortenerApi;
