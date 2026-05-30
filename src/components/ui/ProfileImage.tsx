"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProfileImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxNic+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzBhMGExYScgb2Zmc2V0PScwJy8+PHN0b3Agc3RvcC1jb2xvcj0nIzFlNDBhZicgb2Zmc2V0PScxJy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgZmlsbD0ndXJsKCNnKScgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2Jy8+PC9zdmc+";

export default function ProfileImage({ src, alt, className }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      {isLoading ? <div className="absolute inset-0 animate-pulse bg-white/5" /> : null}

      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-top"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,rgba(59,130,246,0.85),rgba(30,64,175,0.42)_42%,rgba(30,27,75,0.92)_100%)]">
          <span className="font-[family-name:var(--font-syne)] text-6xl font-bold tracking-[0.08em] text-white/95">
            SP
          </span>
        </div>
      )}
    </div>
  );
}
