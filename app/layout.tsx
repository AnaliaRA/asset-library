import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import RequestButton from './components/requestButton';

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asset Library",
  description: "Browse and manage your assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased bg-gray-50`}>
        <div className="absolute top-0 right-0 p-4">
          <RequestButton />
        </div>
        {children}
      </body>
    </html>
  );
}
