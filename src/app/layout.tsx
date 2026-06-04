import type { Metadata } from 'next';
import { getSharedMetadata, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  ...getSharedMetadata(),
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
