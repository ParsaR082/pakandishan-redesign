import { useState } from 'react';
import { Factory } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#171512] via-[#11100e] to-[#090909] border border-[#c5a46d]/15 p-6 text-center"
      >
        <Factory className="w-10 h-10 text-[#c5a46d]/70" strokeWidth={1.3} aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-sm text-[#aaa39a] font-medium">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
