import imageUrlBuilder from '@sanity/image-url';
import type {Image} from 'sanity';
import {dataset, projectId} from '@/sanity/env';
import type {SanityImage} from '@/types';

/**
 * Sanity image URL builder instance
 * Used to generate optimized image URLs from Sanity image references
 */
const imageBuilder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || ''
});

/**
 * Generate optimized image URL from Sanity image reference
 * @param source - Sanity image object
 * @returns Image URL builder instance for chaining transformations
 *
 * @example
 * ```tsx
 * // Basic usage
 * const url = urlForImage(image).url()
 *
 * // With transformations
 * const url = urlForImage(image)
 *   .width(800)
 *   .height(600)
 *   .fit('crop')
 *   .auto('format')
 *   .url()
 * ```
 */
export const urlForImage = (source: SanityImage | Image) => {
  if (!source || !source.asset) {
    throw new Error('Invalid image source: missing asset reference');
  }

  return imageBuilder.image(source).auto('format').fit('max');
};

/**
 * Get optimized image URL with specific dimensions
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param height - Optional desired height in pixels
 * @returns Optimized image URL string
 */
export function getImageUrl(
  source: SanityImage | Image,
  width?: number,
  height?: number
): string {
  const builder = urlForImage(source);

  if (width) {
    builder.width(width);
  }

  if (height) {
    builder.height(height);
  }

  return builder.url();
}

/**
 * Get image dimensions from Sanity image reference
 * @param source - Sanity image object
 * @returns Image dimensions object with width and height
 */
export function getImageDimensions(source: SanityImage | Image): {
  width: number
  height: number
  aspectRatio: number
} {
  if (!source || !source.asset || !source.asset._ref) {
    throw new Error('Invalid image source: missing asset reference');
  }

  // Parse dimensions from Sanity asset reference
  // Format: image-{assetId}-{width}x{height}-{format}
  const ref = source.asset._ref;
  const dimensions = ref.split('-')[2];

  if (!dimensions) {
    throw new Error('Could not parse image dimensions from asset reference');
  }

  const [width, height] = dimensions.split('x').map(Number);

  if (!width || !height) {
    throw new Error('Invalid image dimensions in asset reference');
  }

  return {
    width,
    height,
    aspectRatio: width / height
  };
}

/**
 * Generate responsive image srcset for different screen sizes
 * @param source - Sanity image object
 * @param widths - Array of widths to generate URLs for
 * @returns srcset string for use in <img> tags
 */
export function getImageSrcSet(
  source: SanityImage | Image,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string {
  return widths
    .map(width => {
      const url = urlForImage(source).width(width).url();
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get blur data URL for image placeholder (LQIP)
 * @param source - Sanity image object
 * @returns Base64 encoded blur data URL
 */
export function getImageBlurDataUrl(source: SanityImage | Image): string {
  return urlForImage(source).width(20).quality(20).blur(10).url();
}
