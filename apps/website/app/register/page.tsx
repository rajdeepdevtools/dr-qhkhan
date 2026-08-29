'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/appointment');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6 animate-bounce" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Patient Accounts Disabled</h1>
      <p className="text-xs text-slate-600 max-w-sm mx-auto">
        Patient accounts are no longer required. You can book an appointment directly without creating an account or logging in.
      </p>
      <p className="text-[10px] text-slate-450">
        Redirecting you to the appointment page in a few seconds...
      </p>
    </div>
  );
}
