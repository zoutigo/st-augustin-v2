import type { Metadata } from 'next';

import { Poppins, Raleway, Comfortaa } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';
import './globals.css';
import { Navbar } from '@/components/navbar/navbar';
import NavigationModal from '@/components/modals/navigation-modal';
import { Footer } from '@/components/footer/footer';
import Breadcrumb from '@/components/breadcrumb';
import { ReactQueryProvider } from '@/lib/react-query-provider';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

const comfortaa = Comfortaa({
  weight: ['400', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-comfortaa',
});

export const metadata: Metadata = {
  title: 'Ecole St Augustin Crémieu',
  description:
    "Informations et Actualités de l'Ecole Saint Augustin de Crémieu !",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="fr">
        <body
          className={`${poppins.variable} ${raleway.variable} ${comfortaa.variable} font-sans overflow-x-hidden`}
        >
          <Navbar />
          <NavigationModal />
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
