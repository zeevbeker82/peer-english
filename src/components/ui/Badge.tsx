import { cn } from "@/lib/utils/cn";

type Color = "blue" | "green" | "yellow" | "red" | "purple" | "gray" | "orange";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  size?: "sm" | "md";
  className?: string;
}

const colorClasses: Record<Color, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  red: "bg-red-100 text-red-700 border-red-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
};

export function Badge({ children, color = "blue", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border rounded-full font-semibold",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}
