
'use client';
import Image from 'next/image';
import type { Block } from '@/lib/types';

export default function BlockModal({ block, onClose }: { block: Block | null, onClose: () => void }) {
  if (!block) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border-2 border-black rounded-md max-w-lg w-full p-4" onClick={e=>e.stopPropagation()}>
        <div className="flex items-start gap-3">
          {block.img_url ? (
            <Image src={block.img_url} alt={block.title} width={120} height={120} className="border border-black" />
          ) : (
            <div className="w-[120px] h-[120px] grid place-items-center border border-black bg-gray-100">
              <span className="text-center text-sm px-2">{block.title}</span>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{block.title}</h2>
            <p className="text-sm text-gray-700">{block.text || "—"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="badge">Type: {block.kind}</span>
              <span className="badge">Status: {block.status}</span>
              <span className="badge">Size: {block.w}×{block.h}</span>
              <span className="badge">Pos: {block.x},{block.y}</span>
            </div>
            <div className="mt-3 flex gap-2">
              {block.href && (
                <a className="button" href={block.href} target="_blank" rel="noreferrer">Visit</a>
              )}
              <a className="button" href={`/b/${block.id}`}>Public page</a>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="button" onClick={onClose} aria-label="Close modal">Close</button>
          {block.status === 'available' && (
            <a className="button" href="#reserve" onClick={(e)=>{e.preventDefault(); document.getElementById('reserve-btn')?.dispatchEvent(new Event('click',{bubbles:true}));}}>Reserve this space</a>
          )}
        </div>
      </div>
    </div>
  );
}
