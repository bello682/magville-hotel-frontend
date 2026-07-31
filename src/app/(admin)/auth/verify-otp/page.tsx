"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Loader2, RotateCw } from "lucide-react";
import {
  verifyOTP,
  resendOTP,
} from "../../../../store/redux/actions/authAction";
import { useAppDispatch } from "../../../../utils/hooks"; // Adjust path to your store hooks

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP code");
      return;
    }

    try {
      setLoading(true);
      // Fixed: Dispatch thunk and unwrap
      await dispatch(verifyOTP({ email, otp })).unwrap();
      router.push("/auth/login?verified=true");
    } catch (err: any) {
      setError(
        typeof err === "string"
          ? err
          : "Verification failed. Check the code and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || !email) return;
    setError(null);
    setMessage(null);

    try {
      setResending(true);
      // Fixed: Passed object { email } instead of raw string email, and dispatched
      await dispatch(resendOTP({ email })).unwrap();
      setMessage("A new 6-digit code has been sent to your email.");
      setTimer(60);
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Verify Your Account
          </h1>
          <p className="text-xs text-slate-400">
            Enter the 6-digit OTP sent to{" "}
            <span className="text-amber-500 font-medium">
              {email || "your email"}
            </span>
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5 text-center">
              Enter Security Code
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <div className="text-center space-y-2 pt-2">
          <button
            onClick={handleResend}
            disabled={timer > 0 || resending}
            className="text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
            />
            {timer > 0 ? `Resend code in ${timer}s` : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
