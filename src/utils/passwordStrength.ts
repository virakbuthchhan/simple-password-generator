import { PasswordStrength } from "../types";

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;

  const strengthMap: Record<
    number,
    { label: string; color: "error" | "warning" | "info" | "success" }
  > = {
    0: { label: "Very Weak", color: "error" },
    1: { label: "Weak", color: "error" },
    2: { label: "Fair", color: "warning" },
    3: { label: "Good", color: "info" },
    4: { label: "Strong", color: "success" },
    5: { label: "Very Strong", color: "success" },
  };

  return {
    score,
    ...strengthMap[score],
  };
}
