import React, { useState } from "react";
import { clsx } from "clsx";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  icon: Icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const inputClasses = clsx(
    "w-full px-4 py-3 bg-dark-card border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none",
    {
      "border-dark-border focus:border-cyber-pink focus:shadow-neon": !error,
      "border-red-500 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20":
        error,
      "opacity-50 cursor-not-allowed": disabled,
      "pl-12": Icon,
      "pr-12": isPassword,
    },
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-cyber-pink ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={clsx(
                "w-5 h-5 transition-colors",
                focused ? "text-cyber-pink" : "text-gray-400"
              )}
            />
          </div>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-cyber-pink transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 animate-slide-in">{error}</p>
      )}
    </div>
  );
};

export default Input;
