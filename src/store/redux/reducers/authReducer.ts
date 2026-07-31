import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/authTypes";
import {
  registerAdmin,
  verifyOTP,
  loginAdmin,
  forgotPassword,
  resetPassword,
  resendOTP,
} from "../actions/authAction";

const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

const initialState: AuthState = {
  user: null,
  token: getInitialToken(),
  pendingEmail: null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setPendingEmail: (state, action: PayloadAction<string>) => {
      state.pendingEmail = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.pendingEmail = null;
      state.error = null;
      state.successMessage = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Register ---
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEmail = action.payload.email;
        state.successMessage = action.payload.message;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // --- Verify OTP ---
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEmail = null;
        state.successMessage = action.payload.message;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      // --- Login ---
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage = action.payload.message;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // --- Forgot Password ---
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to process forgot password";
      })

      // --- Reset Password ---
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEmail = null;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      })

      // --- Resend OTP ---
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Resending OTP failed";
      });
  },
});

export const { clearAuthStatus, setPendingEmail, logout } = authSlice.actions;
export default authSlice.reducer;
