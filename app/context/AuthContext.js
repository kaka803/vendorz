"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const fetchUser = async (token) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
      else setUser(null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
    else setLoading(false);
  }, []);

  const register = async (data) => {
    setAuthLoading(true); setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registration failed");
      setUser(result.user);
      setIsLogin(true);
      toast.success("Registration successful!");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally { setAuthLoading(false); }
  };

  const login = async (data) => {
    setAuthLoading(true); setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Login failed");
      setUser(result.user);
      localStorage.setItem("token", result.token);
      toast.success("Login successful!");
      router.push("/");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally { setAuthLoading(false); }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  // Forgot password: send reset email
  const forgotPassword = async (email) => {
    setAuthLoading(true); setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || "Failed");
      toast.success(result.message || "Reset email sent");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally { setAuthLoading(false); }
  };

  // Reset password (called from reset page)
  const resetPassword = async (token, password) => {
    setAuthLoading(true); setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || "Failed");
      toast.success(result.message || "Password updated");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally { setAuthLoading(false); }
  };

  return (
    <AuthContext.Provider value={{
      user, loading, authLoading, error, register, login, logout,
      setError, isLogin, setIsLogin, forgotPassword, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
