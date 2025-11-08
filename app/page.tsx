
'use client';
import TopBanner from "@/components/TopBanner";
import WallCanvas from "@/components/WallCanvas";
import SearchPanel from "@/components/SearchPanel";
import BlockModal from "@/components/BlockModal";
import ReserveModal from "@/components/ReserveModal";
import type { Block } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "@/lib/store";

export default function Page() {
  const [active, setActive] = useState<Block | null>(null);
  const { blocks, setBlocks, setFocusId } = useAppStore();

  useEffect(()=>{
    fetch('/api/blocks?status=all').then(r=>r.json()).then(setBlocks);
  },[setBlocks]);

  useEffect(()=>{
    const handler = ()=> setReserveOpen(true);
    document.addEventListener('open-reserve-modal', handler as any);
    return ()=>document.removeEventListener('open-reserve-modal', handler as any);
  },[]);

  const onFocusBlock = useCallback((id: string)=>{
    setFocusId(id);
    const b = blocks.find(x=>x.id===id);
    if (b) setActive(b);
  },[blocks, setFocusId]);

  const [reserveOpen, setReserveOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <TopBanner />
      <div className="flex flex-1">
        <WallCanvas blocks={blocks} onSelectBlock={setActive} />
        <SearchPanel blocks={blocks} onFocusBlock={onFocusBlock} />
      </div>
      <BlockModal block={active} onClose={()=>setActive(null)} />
      <ReserveModal open={reserveOpen} onClose={()=>setReserveOpen(false)} />
    </main>
  );
}
