import api from "../lib/axios";
import type { RegisterPayload, User } from "../types/type";

export class AuthRepository {
  async register(payload: RegisterPayload): Promise<User> {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("user_name", payload.user_name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.password_confirmation);
    if (payload.profile_image) {
      formData.append("profile_image", payload.profile_image);
    }

    const response = await api.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify({...user}))

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

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify({...user}))

    return user;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
