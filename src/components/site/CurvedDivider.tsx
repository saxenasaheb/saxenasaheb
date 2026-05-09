import { cn } from "@/lib/utils";

type DividerVariant = "cream-to-taupe" | "taupe-to-cream" | "cream-to-clay" | "clay-to-cream" | "taupe-to-clay" | "clay-to-taupe" | "charcoal-to-clay";

const variantMap: Record<DividerVariant, { fill: string }> = {
  "cream-to-taupe": { fill: "#E8DFD3" },
  "taupe-to-cream": { fill: "#F5F0E8" },
  "cream-to-clay":  { fill: "#D4C4B0" },
  "clay-to-cream":  { fill: "#F5F0E8" },
  "taupe-to-clay":  { fill: "#D4C4B0" },
  "clay-to-taupe":  { fill: "#E8DFD3" },
  "charcoal-to-clay": { fill: "#D4C4B0" },
};

interface CurvedDividerProps {
  variant?: DividerVariant;
  className?: string;
  flip?: boolean;
}

export function CurvedDivider({
  variant = "cream-to-taupe",
  className,
  flip = false,
}: CurvedDividerProps) {
  const { fill } = variantMap[variant];

  return (
    <div
      className={cn("w-full overflow-hidden leading-none", className)}
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 md:h-20"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
