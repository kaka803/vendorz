// context/AuthContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchUser = async (token) => {
  setLoading(true); // agar loading state use kar rahe ho
  try {
    const res = await fetch("/api/auth/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }), // frontend se token bhej rahe hain
    });

    const data = await res.json();

    if (res.ok) setUser(data.user);
    else setUser(null);
  } catch (err) {
    console.error("Error fetching user:", err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

// Example useEffect: token ko localStorage se le rahe hain
useEffect(() => {
  const token = localStorage.getItem("token"); // ya context/state se
  if (token) fetchUser(token);
  else setLoading(false); // agar token na ho toh loading false
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
      if (!res.ok) throw new Error(result.error);
      console.log(result);
      
      setUser(result.user);
        alert("Registration successful!");
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
      if (!res.ok) throw new Error(result.error);
      setUser(result.user);
      alert("Login successful!");
        localStorage.setItem("token", result.token); // token localStorage me store kar rahe hain
      router.push("/");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally { setAuthLoading(false); }
  };

  const logout = async () => {
    localStorage.removeItem("token"); // token hata rahe hain
    setUser(null);
  };

  useEffect(() => {
    console.log('user',user);
    
  }, [user])
  

  return (
    <AuthContext.Provider value={{ user, loading, authLoading, error, register, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
