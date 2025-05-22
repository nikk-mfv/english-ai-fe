import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useCreateAccount } from "@/hooks/use-user";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validatePassword = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    return {
      isValid: hasUpper && hasLower && hasNumber && hasSpecial,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
    };
  };

  const { username, setUsername, password, setPassword, handleCreateAccount } =
    useCreateAccount();

  const handleSubmit = async () => {
    const result = validatePassword(password);

    let valid = true;

    if (!result.isValid) {
      setPasswordError(
        "Password must include uppercase, lowercase, number, and special character."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (valid) {
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
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength={3}
          maxLength={30}
          title="Only letters, numbers or dash"
        />
        <p className="text-sm text-gray-500 mt-1">
          Must be 3 to 30 characters. Letters, numbers, or dash.
        </p>
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
