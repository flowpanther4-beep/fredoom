
'use client';
import type { Block } from '@/lib/types';
import { useState, useMemo } from 'react';

type Filters = {
  q: string;
  kinds: Set<Block['kind']>;
  cats: Set<NonNullable<Block['category']>>;
};

export default function SearchPanel({
  blocks,
  onFocusBlock
}:{
  blocks: Block[];
  onFocusBlock: (id: string) => void;
}) {
  const [q, setQ] = useState('');
  const [kinds, setKinds] = useState<Filters['kinds']>(new Set());
  const [cats, setCats] = useState<Filters['cats']>(new Set());
  const [open, setOpen] = useState(true);

  const toggle = (set: Set<string>, v: string) => {
    const n = new Set(set);
    if (n.has(v)) n.delete(v); else n.add(v);
    return n;
  };

  const filtered = useMemo(()=>{
    return blocks.filter(b => {
      const matchQ = !q || (b.title.toLowerCase().includes(q.toLowerCase()) || (b.text||'').toLowerCase().includes(q.toLowerCase()));
      const matchKind = kinds.size === 0 || kinds.has(b.kind);
      const matchCat = cats.size === 0 || (b.category && cats.has(b.category));
      return matchQ && matchKind && matchCat;
    }).slice(0,200);
  }, [blocks, q, kinds, cats]);

  const catOptions = ['tech','food','fashion','services','creator','other'] as const;
  const kindOptions = ['brand','name','profile','ad'] as const;

  return (
    <aside className={"w-full md:w-80 border-l border-black bg-white "+(open?'':'h-12 overflow-hidden')}>
      <div className="flex items-center justify-between p-2 md:p-3">
        <div className="font-bold">Search</div>
        <button className="button md:hidden" onClick={()=>setOpen(o=>!o)}>{open?'Hide':'Show'}</button>
      </div>
      <div className={open?'p-3 pt-0':''}>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1" htmlFor="search">Search</label>
          <input id="search" aria-label="Search blocks" className="w-full border border-black px-2 py-1" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="mb-2">
          <div className="text-sm font-bold">Kinds</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {kindOptions.map(k=>(
              <button aria-pressed={kinds.has(k)} key={k} onClick={()=>setKinds(prev=>toggle(prev as any, k) as any)} className={"badge " + (kinds.has(k)?"bg-yellow-200":"")}>{k}</button>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-sm font-bold">Categories</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {catOptions.map(c=>(
              <button aria-pressed={cats.has(c)} key={c} onClick={()=>setCats(prev=>toggle(prev as any, c) as any)} className={"badge " + (cats.has(c)?"bg-yellow-200":"")}>{c}</button>
            ))}
          </div>
        </div>
        <div id="directory" className="mt-3">
          <div className="text-sm font-bold mb-1">Directory ({filtered.length})</div>
          <ul className="max-h-[50vh] overflow-auto border border-black">
            {filtered.map(b=>(
              <li key={b.id} className="p-2 border-b border-black/20 hover:bg-yellow-100 cursor-pointer focus-outline" tabIndex={0} onClick={()=>onFocusBlock(b.id)} onKeyDown={(e)=>{if(e.key==='Enter') onFocusBlock(b.id);}}>
                <div className="text-sm font-bold">{b.title}</div>
                <div className="text-xs text-gray-700">{b.kind} · {b.status} · {b.w}×{b.h} @ {b.x},{b.y}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 text-xs text-center text-gray-600">© 2025 Brand Space – All Rights Reserved.</div>
      </div>
    </aside>
  );
}
