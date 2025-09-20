"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, authLoading, error, setError } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isLogin) {
      const res = await login(data);
      if (!res.success) return;
    } else {
      const res = await register(data);
      if (!res.success) return;
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center font-sans justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...formRegister("name", { required: !isLogin && "Name is required" })}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#365a41]"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...formRegister("email", { required: "Email is required" })}
              type="email"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#365a41]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...formRegister("password", { required: "Password is required" })}
              type="password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#365a41]"
              placeholder="Your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-2 px-4 rounded text-white font-semibold ${
              authLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#365a41] hover:bg-[#2d4a35]"
            }`}
          >
            {authLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-[#365a41] font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
