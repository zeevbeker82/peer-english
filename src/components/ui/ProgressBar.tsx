import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number; // 0–100
  max?: number;
  label?: string;
  color?: "blue" | "green" | "purple" | "orange";
  size?: "sm" | "md" | "lg";
  showPercent?: boolean;
  className?: string;
}

const colorClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

const sizeClasses = {
  sm: "h-2",
  md: "h-3",
  lg: "h-5",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  color = "blue",
  size = "md",
  showPercent = false,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("w-full", className)} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-600">{label}</span>}
          {showPercent && <span className="text-sm font-bold text-gray-700">{percent}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
