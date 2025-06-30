"use client";
import { useState, useCallback, useEffect } from "react";
import { generateSecurePassword } from "../utils/passwordGenerator";
import { calculatePasswordStrength } from "../utils/passwordStrength";
import { PasswordOptions, PasswordStrength } from "../types";

export function usePasswordGenerator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const updateOptions = useCallback((newOptions: Partial<PasswordOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  const generatePassword = useCallback(() => {
    const newPassword = generateSecurePassword(options);
    setPassword(newPassword);
  }, [options]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  }, [password]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const getPasswordStrength = useCallback((pwd: string): PasswordStrength => {
    return calculatePasswordStrength(pwd);
  }, []);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return {
    password,
    options,
    showPassword,
    snackbarOpen,
    updateOptions,
    generatePassword,
    copyToClipboard,
    toggleShowPassword,
    closeSnackbar,
    getPasswordStrength,
  };
}
