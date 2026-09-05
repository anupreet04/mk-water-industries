export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
}

export type GalleryCategory =
  | 'Products'
  | 'Packaging'
  | 'Brand'
  | 'Factory'
  | 'Machinery'
  | 'Warehouse'
  | 'Team'
  | 'Loading/Dispatch';

export const galleryCategories: GalleryCategory[] = [
  'Products',
  'Packaging',
  'Brand',
  'Factory',
  'Machinery',
  'Warehouse',
  'Team',
  'Loading/Dispatch',
];

/*
 * Gallery images — centralized data source.
 *
 * To add a new photo:
 * 1. Drop the image into public/assets/images/gallery/<category>/ (create the folder if needed).
 * 2. Add an entry below with the path, alt text, and matching category.
 *
 * Existing product/label/logo images are reused until real client photos are uploaded.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg',
    alt: 'MK Water Industries premium drinking water bottle',
    category: 'Products',
    title: 'Premium Water Bottle',
  },
  {
    id: 2,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.22_(1).jpeg',
    alt: 'MK Water Industries bottle label design',
    category: 'Packaging',
    title: 'Bottle Label Design',
  },
  {
    id: 3,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg',
    alt: 'MK Water 20 litre water jar',
    category: 'Products',
    title: '20L Water Jar',
  },
  {
    id: 4,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.22_(1).jpeg',
    alt: 'Custom branding label for MK Water bottles',
    category: 'Packaging',
    title: 'Custom Branding Label',
  },
  {
    id: 5,
    src: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
    alt: 'MK Water Industries company logo',
    category: 'Brand',
    title: 'MK Water Industries Logo',
  },
  {
    id: 6,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg',
    alt: 'Quality bottled drinking water product showcase',
    category: 'Products',
    title: 'Product Showcase',
  },
  {
    id: 7,
    src: '/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.22_(1).jpeg',
    alt: 'MK brand label detail',
    category: 'Packaging',
    title: 'MK Brand Label',
  },
  {
    id: 8,
    src: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
    alt: 'MK Water Industries brand identity',
    category: 'Brand',
    title: 'Brand Identity',
  },
];
