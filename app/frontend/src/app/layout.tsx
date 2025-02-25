import { ReactNode } from 'react';
import ClientWrapper from './clientWrapper';
import Header from '@/shared/ui/Header';
import Footer from '@/shared/ui/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <ClientWrapper>
      <Header />
      {children}
      <Footer />
    </ClientWrapper>
    </body>
    </html>
  );
}
