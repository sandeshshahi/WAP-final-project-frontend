export interface User {
  name: string;
  email: string;
  id?: number;
}

export interface AuthResponse {
  success: boolean;
  encData: string;
  hashData: string;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  vote: number;
  user_id: number;
  name?: string;
}
