import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useCreateAccount } from "@/hooks/use-user";
import { validateUsername, validatePassword } from "@/lib/validator";


export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const { username, setUsername, password, setPassword, handleCreateAccount } =
    useCreateAccount();

  const handleSubmit = async () => {
    const usernameMsg = validateUsername(username);
    const passwordMsg = validatePassword(password);
    const confirmMsg =
      password !== confirmPassword ? "Passwords do not match." : "";

    setUsernameError(usernameMsg ?? "");
    setPasswordError(passwordMsg ?? "");
    setConfirmError(confirmMsg);

    const isValid = !usernameMsg && !passwordMsg && !confirmMsg;

    if (isValid) {
      await handleCreateAccount();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Create an account
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
          minLength={8}
          maxLength={64}
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

      {/* Confirm Password */}
      <div className="flex flex-col relative">
        <input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-3 pr-10 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Confirm your password"
          minLength={8}
          maxLength={64}
        />
        <div
          className="absolute right-3 top-[15px] cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
        {confirmError && (
          <p className="text-sm text-red-600 mt-1">{confirmError}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        onClick={handleSubmit}
      >
        Create Account
      </button>

      {/* Already have account */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/log-in" className="text-green-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
