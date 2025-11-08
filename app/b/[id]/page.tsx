
import type { Metadata } from 'next';
import { blocks } from '../../../lib/data';

type Params = { params: { id: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const b = blocks.find(x=>x.id===params.id);
  const title = b ? `${b.title} – Brand Space™` : 'Block – Brand Space™';
  const desc = b?.text || 'Brand Space™ public block page';
  const img = b?.img_url || 'https://placehold.co/1200x630/png?text=Brand+Space%E2%84%A2';
  return {
    title,
    description: desc,
    openGraph: {
      title, description: desc, images: [{ url: img }]
    }
  };
}

export default function BlockPublicPage({ params }: Params) {
  const b = blocks.find(x=>x.id===params.id);
  if (!b) return <div className="p-6">Not found</div>;
  return (
    <main className="min-h-screen bg-brandYellow p-6">
      <div className="max-w-3xl mx-auto bg-white border-2 border-black p-4">
        <h1 className="text-2xl font-bold">{b.title}</h1>
        <p className="text-sm text-gray-700 mt-1">{b.text || '—'}</p>
        <div className="mt-2 text-sm">Type: {b.kind} · Status: {b.status} · Size: {b.w}×{b.h} · Pos: {b.x},{b.y}</div>
        {b.href && <a className="button mt-3 inline-block" href={b.href} target="_blank">Visit link</a>}
      </div>
    </main>
  );
}
