import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CircleAlert } from "lucide-react";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === "admin@gmail.com" && password === "password123") {
            const user = {
                email: "admin@gmail.com",
                name: "Kyaw Kyaw",
                loginTime: new Date().toLocaleString(),
            };

            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            {/* Left branding panel */}
            <div className="hidden lg:flex flex-1 items-center justify-center px-16 relative overflow-hidden">
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Ambient glow */}
                <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative text-center max-w-md">
                    <div className="flex items-center justify-center gap-3 mb-8 text-green-500">
                        <span className="h-px w-10 bg-linear-to-r from-transparent to-green-500 block" />
                        <span className="text-xs tracking-widest uppercase font-medium">
                            FRAME STUDIO SHELL
                        </span>
                        <span className="h-px w-10 bg-linear-to-l from-transparent to-green-500 block" />
                    </div>

                    <h1 className="text-7xl font-light text-zinc-100 leading-none tracking-tight mb-6">
                        Admin
                        <br />
                        <span className="text-green-400 italic font-semibold">
                            Portal
                        </span>
                    </h1>

                    <p className="text-sm text-zinc-500 leading-relaxed font-light">
                        Secure access to your management dashboard.
                        <br />
                        Sign in to continue.
                    </p>
                </div>
            </div>

            {/* Right form panel */}
            <div className="w-full lg:w-120 flex items-center justify-center px-8 sm:px-14 py-16 bg-zinc-900 border-l border-zinc-800">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="w-8 h-0.5 bg-green-400 mb-5" />
                        <h2 className="text-3xl font-light text-zinc-100 tracking-tight mb-2">
                            Welcome back
                        </h2>
                        <p className="text-xs text-zinc-500 font-light tracking-wide">
                            Enter your credentials to access the dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2.5 bg-red-950/50 border border-red-800/40 rounded-lg px-4 py-3 text-red-400 text-sm">
                                <CircleAlert className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-xs tracking-widest uppercase text-zinc-500 font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="admin@gmail.com"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-zinc-100 text-sm font-light placeholder-zinc-700 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-xs tracking-widest uppercase text-zinc-500 font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 pr-12 text-zinc-100 text-sm font-light placeholder-zinc-700 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-green-400 transition-colors duration-200 focus:outline-none"
                                    tabIndex={-1}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="text-white w-full mt-2 bg-green-400 hover:bg-green-300  font-medium text-xs tracking-widest uppercase py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-px active:translate-y-0"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600 tracking-wide">
                        Protected by end-to-end encryption
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
