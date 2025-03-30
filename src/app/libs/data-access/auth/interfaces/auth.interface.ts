export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Authorization {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  user: User;
  authorization: Authorization;
}

export interface MyRequestBody {
  username: string;
  password: string;
}
