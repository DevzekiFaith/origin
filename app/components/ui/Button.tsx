"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-[#60a5fa] text-black font-extrabold hover:bg-[#3b82f6] hover:shadow-lg shadow-[#60a5fa]/20",
    secondary: "bg-[#282828] text-white font-bold hover:bg-[#333333] hover:text-white border border-white/10 hover:border-white/30 hover:shadow-md",
    outline: "border-2 border-[#60a5fa]/60 text-white font-bold hover:border-[#60a5fa] hover:bg-[#60a5fa]/10 hover:text-[#60a5fa] shadow-sm",
  };

  const sizes = {
    sm: "px-6 py-2 text-base",
    md: "px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl",
    lg: "px-12 sm:px-16 py-4 sm:py-5 text-xl sm:text-2xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
