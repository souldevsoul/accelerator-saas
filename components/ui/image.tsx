'use client';

import NextImage from 'next/image';
import { forwardRef, useState, ReactNode } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  decorative?: boolean;
  fallback?: ReactNode;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

/**
 * Accessible image component with loading states and proper alt text
 * Built on top of Next.js Image component with additional error handling
 */
const Image = forwardRef<HTMLImageElement, ImageProps>(({
  src,
  alt,
  className = '',
  lazy = true,
  decorative = false,
  fallback,
  onLoad,
  onError,
  // loading = 'lazy', // unused parameter
  sizes,
  width,
  height,
  fill = false,
  priority = false
}, ref) => {
  const [imageError, setImageError] = useState(false);

  // Handle decorative images
  const imageAlt = decorative ? '' : alt;

  // Validate required alt text for non-decorative images
  if (!decorative && !alt) {
    console.warn('Image component: alt text is required for accessibility. Use decorative={true} for decorative images.');
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  // Show fallback if image failed to load
  if (imageError && fallback) {
    return <>{fallback}</>;
  }

  // Show default error state if no fallback provided
  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        role="img"
        aria-label={decorative ? undefined : `Failed to load image: ${alt}`}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  // Use Next.js Image component
  return (
    <NextImage
      ref={ref}
      src={src}
      alt={imageAlt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      sizes={sizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority || !lazy}
    />
  );
});

Image.displayName = 'Image';

export default Image;