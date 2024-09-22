import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  startIcon,
  endIcon,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary-green hover:bg-primary-green";
      case "danger":
        return "bg-red-700 hover:bg-red-600";
      case "primary":
      default:
        return "bg-primary-green hover:bg-secondary-green";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "px-2 py-1 text-sm";
      case "large":
        return "px-6 py-3 text-lg";
      case "medium":
      default:
        return "px-4 py-2 text-base";
    }
  };

  return (
    <button
      className={`${getVariantClass()} ${getSizeClass()} flex items-center justify-center gap-2 rounded text-light font-semibold hover:text-white hover:shadow-xl hover:scale-105 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="icon-start">{startIcon}</span>}
      {label}
      {endIcon && <span className="icon-end">{endIcon}</span>}
    </button>
  );
};

export default Button;
