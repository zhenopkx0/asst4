import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "grey" | "blue";
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles =
  "inline-block px-6 py-3 rounded-2xl transition-all duration-200 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
  grey: "bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-300",
  blue: "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600",
};

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${baseStyles} ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          : variants[variant]
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
