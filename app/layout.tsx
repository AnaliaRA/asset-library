import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import NavigationBar from '@/app/components/navigationBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asset Library',
  description: 'A collection of assets for your project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
