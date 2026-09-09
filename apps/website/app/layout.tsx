import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';
import { LanguageProvider } from '../lib/language-context';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UpcomingShivirPopup } from '../components/UpcomingShivirPopup';

export const metadata: Metadata = {
  title: 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC | Est. 1958 Gaya',
  description:
    'Official website of Dr. Q.H. Khan Classical Homoeopathic Clinic in Nagmatia Road, Gaya, Bihar. Providing classical homoeopathic care, doctor consultation, and treatment support since 1958.',
  keywords: [
    'Dr QH Khan',
    'Classical Homoeopathic Clinic',
    'Gaya',
    'Nagmatia Road',
    'Homeopathic clinic Gaya',
    'Homeopathy Gaya',
  ],
  metadataBase: new URL('https://drqhkhanclinic.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <UpcomingShivirPopup />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
