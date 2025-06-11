import api from "../lib/axios";
import type { RegisterPayload, User } from "../types/type";

export class AuthRepository {
  async register(payload: RegisterPayload): Promise<User> {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("img_profile_url",  payload.img_profile_url);

    const response = await api.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { token, refresh_token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", refresh_token);

    return user;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const response = await api.post("/login", { email, password });

    const { token, refresh_token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", refresh_token);

    return user;
  }

  async refreshToken() {
    try {
      const response = await api.post("/refresh");

      console.log("refresh response", response.data);

      const newToken = response.data.Token;
      localStorage.setItem("token", newToken);
    } catch (err) {
      console.error("refreshToken() failed", err);
      throw err;
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
