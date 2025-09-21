
'use client'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AuthPage() {
  const { login, register, authLoading, error, setError, isLogin, setIsLogin, forgotPassword } = useAuth();
  const [showForgot, setShowForgot] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (showForgot) {
      // Forgot flow: send reset email
      const res = await forgotPassword(data.email);
      if (res.success) {
        reset();
        setShowForgot(false);
      }
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center  px-4 font-sans">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
    {/* Logo + Heading */}
    <h2 className="text-xl font-semibold mb-6 text-center tracking-tight">
      <span className="bg-gradient-to-r from-[#365a41] to-[#2d4a35] bg-clip-text text-transparent">
        3dvendorz
      </span>{" "}
      {showForgot ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
    </h2>

    {/* Error Message */}
    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {showForgot ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...formRegister("email", { required: "Email is required" })}
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365a41]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-2.5 rounded-lg text-white font-medium shadow-md transition-all duration-300 ${
              authLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#365a41] to-[#2d4a35] hover:opacity-90"
            }`}
          >
            {authLoading ? "Please wait..." : "Send Reset Email"}
          </button>
        </>
      ) : (
        <>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                {...formRegister("name", { required: !isLogin && "Name is required" })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365a41]"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...formRegister("email", { required: "Email is required" })}
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365a41]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...formRegister("password", { required: "Password is required" })}
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365a41]"
              placeholder="Your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-2.5 rounded-lg text-white font-medium shadow-md transition-all duration-300 ${
              authLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#365a41] to-[#2d4a35] hover:opacity-90"
            }`}
          >
            {authLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </>
      )}
    </form>

    {/* Links Section */}
    {!showForgot ? (
      <div className="mt-5 flex justify-between items-center text-sm">
        <button
          onClick={() => {
            setShowForgot(true);
            setError(null);
          }}
          className="text-gray-600 hover:text-[#365a41] hover:underline"
        >
          Forgot password?
        </button>
        <p className="text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-[#365a41] font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    ) : (
      <p className="text-sm text-gray-600 mt-4 text-center">
        Remembered?{" "}
        <button
          onClick={() => {
            setShowForgot(false);
            setError(null);
          }}
          className="text-[#365a41] font-medium hover:underline"
        >
          Back to login
        </button>
      </p>
    )}

    {/* Return to Home */}
    <div className="mt-6 text-center">
      <Link
        href="/"
        className="inline-block text-sm text-gray-600 hover:text-[#365a41] hover:underline"
      >
        ← Return to Home
      </Link>
    </div>
  </div>
</div>

  );
}
