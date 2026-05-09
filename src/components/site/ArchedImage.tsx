import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArchedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function ArchedImage({
  src,
  alt,
  width = 480,
  height = 600,
  className,
  containerClassName,
  priority = false,
}: ArchedImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden arch-frame",
        containerClassName
      )}
      style={{ width: "100%", aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn("object-cover object-center", className)}
        priority={priority}
      />
    </div>
  );
}
