import { PasswordOptions } from "../types";

const CHARSET = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export function generateSecurePassword(options: PasswordOptions): string {
  let charset = "";
  let password = "";

  // Build charset based on options
  if (options.includeUppercase) charset += CHARSET.uppercase;
  if (options.includeLowercase) charset += CHARSET.lowercase;
  if (options.includeNumbers) charset += CHARSET.numbers;
  if (options.includeSymbols) charset += CHARSET.symbols;

  if (!charset) {
    throw new Error("At least one character type must be selected");
  }

  // Ensure at least one character from each selected type
  if (options.includeUppercase && charset.includes(CHARSET.uppercase[0])) {
    password += getRandomChar(CHARSET.uppercase);
  }
  if (options.includeLowercase && charset.includes(CHARSET.lowercase[0])) {
    password += getRandomChar(CHARSET.lowercase);
  }
  if (options.includeNumbers && charset.includes(CHARSET.numbers[0])) {
    password += getRandomChar(CHARSET.numbers);
  }
  if (options.includeSymbols && charset.includes(CHARSET.symbols[0])) {
    password += getRandomChar(CHARSET.symbols);
  }

  // Fill the rest of the password length
  for (let i = password.length; i < options.length; i++) {
    password += getRandomChar(charset);
  }

  // Shuffle the password to avoid predictable patterns
  return shuffleString(password);
}

function getRandomChar(charset: string): string {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

function shuffleString(str: string): string {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}
