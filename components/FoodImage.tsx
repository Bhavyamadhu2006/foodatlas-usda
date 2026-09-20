"use client";

import { useEffect, useState } from "react";

export default function FoodImage({
  src,
  alt,
  className = ""
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt}. Image unavailable.`}
        className={`grid place-items-center bg-gradient-to-br from-forest-800 to-forest-950 p-4 text-center ${className}`}
      >
        <div>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-forest-600 bg-forest-850 text-[24px] text-forest-300">
            ❧
          </div>
          <div className="mt-3 text-[14px] font-extrabold text-cream-50">{alt}</div>
          <div className="mt-1 text-[12px] font-semibold text-forest-300/70">Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
