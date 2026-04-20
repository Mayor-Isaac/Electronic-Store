import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Loader from "./ui/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

      if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      {loading? <Loader /> : (
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4"
        >
          <div className="flex items-center gap-6">
            <img src="/assets/logo.jpg" alt="" className="w-20 h-20" />
          <h2 className="text-3xl font-bold">Login</h2>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border placeholder:text-inherit border-gray-300 p-2 rounded-xl focus:outline-none focus:border-[2px] focus:ring-gray-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex items-center gap-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border placeholder:text-inherit border-gray-300 p-2 rounded-xl focus:outline-none focus:border-[2px] focus:ring-gray-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>)}
    </div>
  );
}
