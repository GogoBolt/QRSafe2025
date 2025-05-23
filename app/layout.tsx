import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/lib/auth-context';
import MainNav from '@/components/main-nav';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QR-Safe for School Fred et Poppée - Sécurité Scolaire avec QR Code',
  description: 'Solution innovante pour la sécurité scolaire avec QR Code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <MainNav />
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}