
'use client';
import TopBanner from "@/components/TopBanner";
import WallCanvas from "@/components/WallCanvas";
import SearchPanel from "@/components/SearchPanel";
import BlockModal from "@/components/BlockModal";
import type { Block } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";

export default function Page() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [active, setActive] = useState<Block | null>(null);

  useEffect(()=>{
    fetch('/api/blocks?status=all').then(r=>r.json()).then(setBlocks);
  },[]);

  const onFocusBlock = useCallback((id: string)=>{
    const b = blocks.find(x=>x.id===id);
    if (b) setActive(b);
  },[blocks]);

  return (
    <main className="min-h-screen flex flex-col">
      <TopBanner />
      <div className="flex flex-1">
        <WallCanvas blocks={blocks} onSelectBlock={setActive} />
        <SearchPanel blocks={blocks} onFocusBlock={onFocusBlock} />
      </div>
      <BlockModal block={active} onClose={()=>setActive(null)} />
    </main>
  );
}
