import type { MetadataRoute } from 'next';
import { getAllSitemapEntries } from '@/lib/sitemap-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries();
}
