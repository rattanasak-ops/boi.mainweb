"use client";

import Image from "next/image";

type BOILogoVariant = "header" | "header-white" | "footer" | "loading";

type BOILogoProps = {
  variant?: BOILogoVariant;
  className?: string;
  interactive?: boolean;
};

const BOI_LOGO_LOCKUP_SRC = "/images/boi/boi-lockup.png";
const BOI_LOGO_MARK_SRC = "/images/boi/boi-mark.png";

const DEFAULT_CONTAINER_CLASS: Record<BOILogoVariant, string> = {
  header: "h-11 w-auto",
  "header-white": "h-11 w-auto",
  footer: "h-[72px] w-auto",
  loading: "h-[96px] w-auto",
};

export default function BOILogo({
  variant = "header",
  className,
  interactive: interactiveProp,
}: BOILogoProps) {
  const interactive = interactiveProp ?? variant !== "loading";
  const containerClass = className ?? DEFAULT_CONTAINER_CLASS[variant];
  const alt = "Thailand Board of Investment";

  const src = variant === "loading" ? BOI_LOGO_MARK_SRC : BOI_LOGO_LOCKUP_SRC;
  const intrinsic =
    variant === "loading"
      ? { width: 240, height: 257 } // derived from boi-mark.png crop
      : { width: 600, height: 257 }; // boi-lockup.png

  return (
    <div
      className={`inline-flex items-center select-none ${interactive ? "cursor-pointer" : ""} ${containerClass}`}
    >
      <Image
        src={src}
        alt={alt}
        width={intrinsic.width}
        height={intrinsic.height}
        priority={variant === "header" || variant === "loading"}
        className={`h-full w-auto object-contain transition-transform duration-200 ${interactive ? "hover:scale-[1.02]" : ""}`}
      />
    </div>
  );
}
