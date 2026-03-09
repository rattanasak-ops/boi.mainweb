"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo credentials
    await new Promise((r) => setTimeout(r, 800));
    if (username === "admin" && password === "123") {
      document.cookie = "boi-admin-auth=1; path=/; max-age=86400; samesite=lax";
      router.push("/admin");
    } else {
      setError("Username or password is incorrect");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">BOI Admin</h1>
          <p className="mt-2 text-sm text-white/40">Template Management System</p>
        </div>

        {/* Login card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                placeholder="Enter username"
                autoFocus
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-xs text-white/25 text-center">
              Demo: username{" "}
              <code className="px-1.5 py-0.5 bg-white/[0.06] rounded text-amber-400/60">
                admin
              </code>{" "}
              / password{" "}
              <code className="px-1.5 py-0.5 bg-white/[0.06] rounded text-amber-400/60">
                123
              </code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/20">
          BOI Thailand &copy; 2026 &mdash; Powered by SYNERRY
        </p>
      </div>
    </div>
  );
}
