"use client";

import Image from "next/image";
import type { FC } from "react";

type AvatarProps = {
  src?: string;
  alt?: string;
};

// Simple avatar component with image fallback
export const Avatar: FC<AvatarProps> = ({ src, alt }) => {
  // Use first letter of alt or "?" as fallback
  const fallbackText = alt ? alt.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="
        flex h-12 w-12 items-center justify-center
        overflow-hidden rounded-[4px]
        bg-[var(--surface-card)]
        text-[var(--text-body)]
      "
      role="img"
      aria-label={alt || "Avatar"}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-sm font-medium leading-none">{fallbackText}</span>
      )}
    </div>
  );
};