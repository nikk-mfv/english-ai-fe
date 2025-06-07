export const validateUsername = (username: string): string | null => {
  if (!username) return "Username is required.";
  if (!/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(username)) {
    return "Username must be 3-30 characters and start with a letter. Only letters, numbers or dash.";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required.";

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
    return "Password must include uppercase, lowercase, number, and special character.";
  }

  if (password.length < 8 || password.length > 64) {
    return "Password must be between 8 and 64 characters.";
  }

  return null;
};
