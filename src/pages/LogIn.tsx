import { validateUsername, validatePassword } from "@/lib/validator";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/use-user";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();

  const handleSubmit = async () => {
    const usernameMsg = validateUsername(username);
    const passwordMsg = validatePassword(password);

    setUsernameError(usernameMsg ?? "");
    setPasswordError(passwordMsg ?? "");

    const isValid = !usernameMsg && !passwordMsg;
    if (isValid) {
      await handleLogin();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Welcome back!
      </h1>

      {/* Username */}
      <div className="flex flex-col">
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-3 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Your username"
        />
        {usernameError && (
          <p className="text-sm text-red-600 mt-1">{usernameError}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 pr-10 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Your password"
        />
        <div
          className="absolute right-3 top-[15px] cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>

        {passwordError && (
          <p className="text-sm text-red-600 mt-1">{passwordError}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        onClick={handleSubmit}
      >
        Log in
      </button>

      {/* Already have account */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-green-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
