import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage component
 *
 * A component for optimized image loading with:
 * - Lazy loading
 * - Progressive loading with blur-up effect
 * - WebP format support with fallback
 * - Size optimization with responsive image sizes
 * - Error handling
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for accessibility
 * @param {number} props.width - Desired image width
 * @param {number} props.height - Desired image height
 * @param {boolean} props.lowQualityPlaceholder - Whether to show low quality placeholder
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.sizes - Responsive sizes attribute
 * @param {Function} props.onLoad - Callback function when image loads
 * @param {Function} props.onError - Callback function when image fails to load
 */
const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  lowQualityPlaceholder = true,
  className = '',
  sizes = '100vw',
  onLoad = () => {},
  onError = () => {},
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [placeholderSrc, setPlaceholderSrc] = useState('');
  const imgRef = useRef(null);

  // Check if WebP is supported
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    // Test browser WebP support
    const checkWebP = async () => {
      const webPSupport = await testWebP();
      setSupportsWebP(webPSupport);
    };

    checkWebP();

    // Generate low quality placeholder if enabled
    if (lowQualityPlaceholder && src) {
      generatePlaceholder(src);
    }

    // Set up intersection observer for lazy loading
    if (imgRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Set data-src as src when element becomes visible
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '100px' } // Start loading images when they're 100px from viewport
      );

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [src, lowQualityPlaceholder]);

  // Test WebP support
  const testWebP = () => {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
        resolve(webP.height === 2);
      };
      webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  };

  // Generate low quality placeholder
  const generatePlaceholder = imageSrc => {
    // In a real implementation, this would call an API to generate a tiny placeholder
    // For demo purposes, we'll simulate it
    const placeholder = imageSrc.replace(/\.(jpg|jpeg|png|gif)$/, '-thumb.$1');
    setPlaceholderSrc(placeholder);
  };

  const handleImageLoad = e => {
    setIsLoaded(true);
    onLoad(e);
  };

  const handleImageError = e => {
    setError(true);
    onError(e);
  };

  // Get WebP version of image if supported
  const getOptimizedSrc = imageSrc => {
    if (!imageSrc) return '';

    // If browser supports WebP and image is not already WebP, SVG, or GIF
    if (supportsWebP && !/\.(webp|svg|gif)$/i.test(imageSrc)) {
      // Check if there's a WebP version available
      // In production, you would have a system to serve WebP automatically
      return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    return imageSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = imageSrc => {
    if (!imageSrc) return '';

    const optimizedSrc = getOptimizedSrc(imageSrc);
    // Extract base name and extension
    const lastDot = optimizedSrc.lastIndexOf('.');
    const baseName = optimizedSrc.substring(0, lastDot);
    const extension = optimizedSrc.substring(lastDot);

    // Generate srcset with multiple sizes
    // In production, you would have these various sizes pre-generated
    return `
      ${baseName}-300w${extension} 300w,
      ${baseName}-600w${extension} 600w,
      ${baseName}-900w${extension} 900w,
      ${baseName}-1200w${extension} 1200w,
      ${optimizedSrc} 1600w
    `;
  };

  // If error, show a placeholder or error state
  if (error) {
    return (
      <div
        className={`optimized-image error ${className}`}
        style={{
          width,
          height,
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span role="img" aria-label="Error loading image">
          🖼️
        </span>
      </div>
    );
  }

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Low quality placeholder */}
      {lowQualityPlaceholder && placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="optimized-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(10px)',
            transform: 'scale(1.1)', // Slightly larger to prevent blur edges
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image with lazy loading */}
      <img
        ref={imgRef}
        data-src={getOptimizedSrc(src)}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy"
        {...rest}
      />
    </div>
  );
};

export default OptimizedImage;
