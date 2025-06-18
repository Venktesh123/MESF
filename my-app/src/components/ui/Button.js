import React from "react";
import { clsx } from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyber-pink to-cyber-blue text-white hover:shadow-neon hover:-translate-y-0.5 focus:ring-cyber-pink",
    secondary:
      "border-2 border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white focus:ring-cyber-pink",
    outline:
      "border border-dark-border text-gray-300 hover:border-cyber-blue hover:text-cyber-blue focus:ring-cyber-blue",
    ghost:
      "text-gray-300 hover:text-cyber-pink hover:bg-cyber-pink/10 focus:ring-cyber-pink",
    danger:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500",
    success:
      "bg-cyber-green text-dark-bg hover:bg-cyber-green/90 hover:shadow-neon-green focus:ring-cyber-green",
    neon: "bg-transparent border-2 border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white hover:shadow-neon animate-pulse focus:ring-cyber-pink",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const classes = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    {
      "animate-pulse": loading,
      "cursor-not-allowed opacity-50": disabled,
    },
    className
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
