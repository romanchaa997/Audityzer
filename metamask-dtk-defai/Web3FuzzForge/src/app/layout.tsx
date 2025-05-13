import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SessionAccountProvider } from '@/providers/SessionAccountProvider';
import { PermissionProvider } from '@/providers/PermissionProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gator ERC7715',
  description: 'A dApp to test the Gator ERC7715 implementation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full font-sans antialiased flex flex-col`}
      >
        <div className="flex-1">
          <main>
            <PermissionProvider>
              <SessionAccountProvider>{children}</SessionAccountProvider>
            </PermissionProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
