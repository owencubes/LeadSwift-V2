import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export const getAuthToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token || null;
};

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateForm = () => {
    const errors = [];
    if (!email) errors.push("Email is required");
    else if (!/\S+@\S+\.\S+/.test(email)) errors.push("Email is invalid");
    if (!password) errors.push("Password is required");
    else if (password.length < 6)
      errors.push("Password must be at least 6 characters");
    return errors;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (data) {
      setError(null);
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: "email" | "password") => {
    if (!touched[field]) return null;
    if (field === "email") {
      if (!email) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    }
    if (field === "password") {
      if (!password) return "Password is required";
      if (password.length < 6) return "Password must be at least 6 characters";
    }
    return null;
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-theme-text">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-theme-text mb-1"
            >
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`glass-input appearance-none relative block w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent sm:text-sm ${
                getFieldError("email") ? "border-red-500" : ""
              }`}
              placeholder="Email address"
            />
            {getFieldError("email") && (
              <p className="mt-1 text-sm text-red-500">
                {getFieldError("email")}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-theme-text mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`glass-input appearance-none relative block w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent sm:text-sm ${
                getFieldError("password") ? "border-red-500" : ""
              }`}
              placeholder="Password"
              minLength={6}
            />
            {getFieldError("password") && (
              <p className="mt-1 text-sm text-red-500">
                {getFieldError("password")}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
            <div className="text-sm text-red-500">{error}</div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            onClick={handleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-xl text-theme-text bg-theme-accent hover:bg-theme-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign in"}
          </button>
          {/* <button
            type="submit"
            onClick={handleSignUp}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-xl text-theme-text glass-card hover:bg-theme-accent/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign up"}
          </button> */}
        </div>
      </form>
    </div>
  );
}
