'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientLayout() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
      Redirecting to homepage...
    </div>
  );
}
