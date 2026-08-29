import type { Metadata } from 'next';
import './globals.css';
import { AdminAuthProvider } from '../lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin Control Panel | Dr. Q.H. Khan Clinic',
  description: 'Independent Admin Management Panel for Dr. Q.H. Khan Classical Homoeopathic Clinic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}
