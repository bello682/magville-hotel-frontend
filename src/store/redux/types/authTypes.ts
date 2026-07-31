export type UserRole = "GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// API Request Payloads
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyOTPData {
  email: string;
  otp: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResendOTPData {
  email: string;
}

// API Response Shapes
export interface RegisterResponse {
  status: string;
  message: string;
  email: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}

export interface GenericMessageResponse {
  status: string;
  message: string;
}

// Redux State Interface
export interface AuthState {
  user: User | null;
  token: string | null;
  pendingEmail: string | null; // Keeps track of email across OTP / registration steps
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
