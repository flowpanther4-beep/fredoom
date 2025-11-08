
'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function CheckoutMock() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const updateStatus = useAppStore(s=>s.updateStatus);

  useEffect(()=>{
    // simulate payment success -> approve
    if (id) {
      updateStatus(id, 'approved');
    }
  }, [id, updateStatus]);

  return (
    <main className="min-h-screen bg-brandYellow p-6">
      <div className="max-w-xl mx-auto bg-white border-2 border-black p-4 text-center">
        <h1 className="text-2xl font-bold">Payment received (mock)</h1>
        <p className="mt-2">Your block will appear as <strong>approved</strong> on refresh.</p>
        <a className="button mt-4 inline-block" href="/">Back to homepage</a>
      </div>
    </main>
  );
}
