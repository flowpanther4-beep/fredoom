
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Block } from '@/lib/types';
import BlockView from './Block';
import { clamp } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export default function WallCanvas({
  blocks,
  onSelectBlock
}:{
  blocks: Block[];
  onSelectBlock: (b: Block)=>void;
}) {
  const [scale, setScale] = useState(0.7);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [panning, setPanning] = useState(false);
  const [showAvailability, setShowAvailability] = useState(true);
  const last = useRef<{x:number,y:number}|null>(null);
  const containerRef = useRef<HTMLDivElement|null>(null);
  const focusId = useAppStore(s=>s.focusId);
  const setFocusId = useAppStore(s=>s.setFocusId);

  const worldPx = 1000; // virtual px
  const viewStyle: React.CSSProperties = useMemo(()=> ({
    width: worldPx,
    height: worldPx,
    backgroundImage: "linear-gradient(transparent 9px, #000 10px), linear-gradient(90deg, transparent 9px, #000 10px)",
    backgroundSize: "10px 10px, 10px 10px",
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    transformOrigin: "0 0",
    position: "relative" as const
  }), [scale, tx, ty]);

  useEffect(()=>{
    fitToViewport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if (!focusId) return;
    const b = blocks.find(x=>x.id===focusId);
    if (!b || !containerRef.current) return;
    const el = containerRef.current;
    const cx = el.clientWidth/2;
    const cy = el.clientHeight/2;
    const wx = b.x*10 + (b.w*10)/2;
    const wy = b.y*10 + (b.h*10)/2;
    const desiredScale = Math.min(5, Math.max(0.4, Math.min(el.clientWidth/(b.w*10*2), el.clientHeight/(b.h*10*2))));
    const ntx = cx - wx * desiredScale;
    const nty = cy - wy * desiredScale;
    setScale(desiredScale);
    setTx(ntx);
    setTy(nty);
    setFocusId(null);
  },[focusId, blocks, setFocusId]);

  function fitToViewport() {
    const el = containerRef.current;
    if (!el) return;
    const min = Math.min(el.clientWidth, el.clientHeight);
    const s = clamp(min / worldPx, 0.2, 5);
    setScale(s);
    setTx((el.clientWidth - worldPx * s) / 2);
    setTy((el.clientHeight - worldPx * s) / 2);
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const delta = -e.deltaY * 0.001;
    const newScale = clamp(scale * (1 + delta), 0.2, 5);
    const wx = (cx - tx) / scale;
    const wy = (cy - ty) / scale;
    const ntx = cx - wx * newScale;
    const nty = cy - wy * newScale;
    setScale(newScale);
    setTx(ntx);
    setTy(nty);
  }

  function onMouseDown(e: React.MouseEvent) {
    setPanning(true);
    last.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!panning || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    setTx(tx + dx);
    setTy(ty + dy);
    last.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseUp() { setPanning(false); last.current = null; }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      setPanning(true);
      last.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!panning || !last.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - last.current.x;
    const dy = e.touches[0].clientY - last.current.y;
    setTx(tx + dx);
    setTy(ty + dy);
    last.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd() { setPanning(false); last.current = null; }

  function center() { fitToViewport(); }

  return (
    <div className="relative flex-1 border-t border-black bg-brandYellow">
      <div className="absolute z-10 left-2 top-2 flex gap-2">
        <button className="button" aria-label="Zoom in" onClick={()=>setScale(s=>clamp(s*1.1, 0.2, 5))}>＋</button>
        <button className="button" aria-label="Zoom out" onClick={()=>setScale(s=>clamp(s/1.1, 0.2, 5))}>－</button>
        <button className="button" aria-label="Center" onClick={center}>Center</button>
        <label className="inline-flex items-center gap-2 border border-black bg-white px-2">
          <input type="checkbox" checked={showAvailability} onChange={e=>setShowAvailability(e.target.checked)} aria-label="Show availability"/>
          <span className="text-sm">Show availability</span>
        </label>
        <a id="reserve-btn" href="#reserve" className="button" onClick={(e)=>{e.preventDefault(); document.dispatchEvent(new CustomEvent('open-reserve-modal'));}}>Reserve</a>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden wall-scroll"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div aria-label="Brand Space Wall" className="border border-black bg-white" style={viewStyle}>
          {blocks.map(b => (
            <BlockView key={b.id} b={b} showAvailability={showAvailability} onClick={onSelectBlock}/>
          ))}
        </div>
      </div>
    </div>
  );
}
