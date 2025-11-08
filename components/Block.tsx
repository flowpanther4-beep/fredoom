
'use client';
import type { Block } from '@/lib/types';
import { px } from '@/lib/utils';

export default function BlockView({ b, showAvailability, onClick }:{ b: Block; showAvailability: boolean; onClick: (b: Block)=>void }) {
  const isAvailable = b.status === 'available';
  const style: React.CSSProperties = {
    left: px(b.x),
    top: px(b.y),
    width: px(b.w),
    height: px(b.h),
    background: b.theme_bg || (isAvailable ? '#ffffff' : '#ddd'),
    color: b.theme_fg || '#000',
    border: isAvailable ? '2px dashed #000' : '1px solid #000',
  };

  return (
    <div
      role="button"
      aria-label={`${b.title} block`}
      tabIndex={0}
      className={"absolute overflow-hidden select-none cursor-pointer " + (isAvailable ? "animate-pulseGlow" : "")}
      style={style}
      onClick={()=>onClick(b)}
      onKeyDown={(e)=>{ if(e.key==='Enter') onClick(b); }}
      title={b.title}
    >
      {b.img_url
        ? <img src={b.img_url} alt={b.title} className="w-full h-full object-cover" />
        : <div className="w-full h-full grid place-items-center text-[10px] md:text-xs font-bold drop-shadow">{b.title}</div>
      }
      {showAvailability && (
        <div className={"absolute inset-0 "+(isAvailable ? "bg-green-400/30":"bg-red-400/30")} aria-hidden="true"></div>
      )}
      {isAvailable && (
        <div className="absolute bottom-1 inset-x-1 text-center text-[9px] md:text-xs font-bold">
          {b.title}
        </div>
      )}
    </div>
  );
}
