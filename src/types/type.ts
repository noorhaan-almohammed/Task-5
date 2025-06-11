export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  img_profile_url: File;
}

export interface User {
  id: number;
  name: string;
  email: string;
  img_profile_url: string;
}

export interface AuthResponse {
  user: User;
  refresh_token: string;
  token: string;
}
export type task = {
  id: number;
  status_id: number,
  owner_id: number,
  title: string;
  description: string;
  status: string;
  owner: string;
  due_date: string;
  created_at: string;
  updated_at: string;
};