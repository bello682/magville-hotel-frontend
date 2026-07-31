import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { adminAxios } from "../../../app/(admin)/lib/axiosInstance";
import {
  RegisterData,
  RegisterResponse,
  VerifyOTPData,
  LoginData,
  AuthResponse,
  ForgotPasswordData,
  ResetPasswordData,
  ResendOTPData,
  GenericMessageResponse,
} from "../types/authTypes";

// Helper function to handle standard Axios errors from Express
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "An unexpected error occurred. Please try again.";
};

// 1. Register Admin
export const registerAdmin = createAsyncThunk<
  RegisterResponse,
  RegisterData,
  { rejectValue: string }
>("auth/registerAdmin", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<RegisterResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// 2. Verify OTP
export const verifyOTP = createAsyncThunk<
  GenericMessageResponse,
  VerifyOTPData,
  { rejectValue: string }
>("auth/verifyOTP", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<GenericMessageResponse>(
      "/auth/verify-otp",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// 3. Login Admin
export const loginAdmin = createAsyncThunk<
  AuthResponse,
  LoginData,
  { rejectValue: string }
>("auth/loginAdmin", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<AuthResponse>("/auth/login", data);
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("adminToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// 4. Forgot Password
export const forgotPassword = createAsyncThunk<
  GenericMessageResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("auth/forgotPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<GenericMessageResponse>(
      "/auth/forgot-password",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// 5. Reset Password
export const resetPassword = createAsyncThunk<
  GenericMessageResponse,
  ResetPasswordData,
  { rejectValue: string }
>("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<GenericMessageResponse>(
      "/auth/reset-password",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// 6. Resend OTP
export const resendOTP = createAsyncThunk<
  GenericMessageResponse,
  ResendOTPData,
  { rejectValue: string }
>("auth/resendOTP", async (data, { rejectWithValue }) => {
  try {
    const response = await adminAxios.post<GenericMessageResponse>(
      "/auth/resend-otp",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
