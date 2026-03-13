import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "success" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white shadow-md hover:shadow-lg",
  success:
    "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md hover:shadow-lg",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md hover:shadow-lg",
  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700",
  outline:
    "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-6 py-3 text-lg rounded-2xl",
  xl: "px-8 py-4 text-xl rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={cn(
          "font-bold transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300",
          "select-none cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            <span>טוען...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
