
'use client';
import { useEffect, useState } from 'react';
import type { BlockDraft, QuoteResponse } from '@/lib/types';

type Props = {
  open: boolean;
  onClose: ()=>void;
};

const PRESETS = [
  {label: '6×4', w:6, h:4},
  {label: '8×8', w:8, h:8},
  {label: '12×8', w:12, h:8},
  {label: '20×10', w:20, h:10},
];

export default function ReserveModal({ open, onClose }: Props) {
  const [draft, setDraft] = useState<BlockDraft>({
    x: 10, y: 10, w: 6, h: 4, kind: 'brand', title: '', text: '', href: '', img_url: '', theme_bg:'#ffffff', theme_fg:'#000000', category:'other'
  });
  const [available, setAvailable] = useState<boolean|null>(null);
  const [quote, setQuote] = useState<QuoteResponse| null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (!open) return;
    // reset
    setAvailable(null); setQuote(null);
  },[open]);

  if (!open) return null;

  async function checkAvailability() {
    setLoading(true);
    const res = await fetch('/api/availability', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ x:draft.x, y:draft.y, w:draft.w, h:draft.h })
    });
    const data = await res.json();
    setAvailable(data.ok);
    setLoading(false);
  }

  async function getQuote() {
    setLoading(true);
    const res = await fetch('/api/quote', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ x:draft.x, y:draft.y, w:draft.w, h:draft.h })
    });
    const q = await res.json();
    setQuote(q);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ draft })
    });
    const data = await res.json();
    window.location.href = data.url + `?id=temp_${Date.now()}`;
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border-2 border-black rounded-md max-w-2xl w-full p-4" onClick={e=>e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-2">Reserve your space</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold">Preset size</label>
            <div className="flex gap-2 my-1 flex-wrap">
              {PRESETS.map(p=>(
                <button key={p.label} className={"badge "+(draft.w===p.w && draft.h===p.h ? "bg-yellow-200":"")} onClick={()=>setDraft({...draft, w:p.w, h:p.h})}>{p.label}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs">X</label>
                <input className="w-full border border-black px-2 py-1" value={draft.x} onChange={e=>setDraft({...draft, x: Number(e.target.value)||0})}/>
              </div>
              <div>
                <label className="block text-xs">Y</label>
                <input className="w-full border border-black px-2 py-1" value={draft.y} onChange={e=>setDraft({...draft, y: Number(e.target.value)||0})}/>
              </div>
              <div>
                <label className="block text-xs">W</label>
                <input className="w-full border border-black px-2 py-1" value={draft.w} onChange={e=>setDraft({...draft, w: Number(e.target.value)||0})}/>
              </div>
              <div>
                <label className="block text-xs">H</label>
                <input className="w-full border border-black px-2 py-1" value={draft.h} onChange={e=>setDraft({...draft, h: Number(e.target.value)||0})}/>
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-bold">Kind</label>
              <select className="w-full border border-black px-2 py-1" value={draft.kind} onChange={e=>setDraft({...draft, kind: e.target.value as any})}>
                <option value="brand">brand</option>
                <option value="name">name</option>
                <option value="profile">profile</option>
                <option value="ad">ad</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold">Title / Label</label>
            <input className="w-full border border-black px-2 py-1" value={draft.title} onChange={e=>setDraft({...draft, title:e.target.value})}/>
            <label className="block text-sm font-bold mt-2">Link</label>
            <input className="w-full border border-black px-2 py-1" value={draft.href||''} onChange={e=>setDraft({...draft, href:e.target.value})}/>
            <label className="block text-sm font-bold mt-2">Image URL (optional)</label>
            <input className="w-full border border-black px-2 py-1" value={draft.img_url||''} onChange={e=>setDraft({...draft, img_url:e.target.value})}/>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-xs">BG</label>
                <input className="w-full border border-black px-2 py-1" value={draft.theme_bg||'#ffffff'} onChange={e=>setDraft({...draft, theme_bg:e.target.value})}/>
              </div>
              <div>
                <label className="block text-xs">FG</label>
                <input className="w-full border border-black px-2 py-1" value={draft.theme_fg||'#000000'} onChange={e=>setDraft({...draft, theme_fg:e.target.value})}/>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="button" onClick={checkAvailability} disabled={loading}>Check availability</button>
              <button className="button" onClick={getQuote} disabled={loading}>Get quote</button>
              <button className="button" onClick={checkout} disabled={!available || !quote || loading}>Reserve (Checkout)</button>
            </div>
            <div className="text-sm mt-2">
              {available===true && <span className="text-green-700 font-bold">Available ✓</span>}
              {available===false && <span className="text-red-700 font-bold">Conflicts detected ✗</span>}
              {quote && <span className="ml-3">Quote: ${(quote.price_cents/100).toFixed(2)} USD</span>}
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button className="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
