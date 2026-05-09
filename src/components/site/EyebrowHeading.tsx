import { cn } from "@/lib/utils";

interface EyebrowHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  titleSize?: "section" | "lg" | "xl";
  className?: string;
  titleClassName?: string;
}

export function EyebrowHeading({
  eyebrow,
  title,
  body,
  align = "left",
  titleSize = "section",
  className,
  titleClassName,
}: EyebrowHeadingProps) {
  const titleSizeClass = {
    section: "text-[clamp(2rem,3vw+1rem,3.5rem)]",
    lg: "text-[clamp(1.75rem,2.5vw+0.75rem,2.75rem)]",
    xl: "text-[clamp(2.5rem,4vw+1rem,4.5rem)]",
  }[titleSize];

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="eyebrow mb-3">{eyebrow}</p>
      )}
      <h2
        className={cn(
          "heading-display",
          titleSizeClass,
          "mb-4",
          titleClassName
        )}
      >
        {title}
      </h2>
      {body && (
        <p className="text-warm-grey leading-relaxed max-w-[65ch] text-base">
          {body}
        </p>
      )}
    </div>
  );
}
