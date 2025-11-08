
'use client';
import type { Block } from '@/lib/types';

function px(n:number){ return `${n*10}px`; }

export default function BlockView({ b, showAvailability, onClick }:{ b: Block; showAvailability: boolean; onClick: (b: Block)=>void }) {
  const isAvailable = b.status === 'available';
  const style: React.CSSProperties = {
    left: px(b.x),
    top: px(b.y),
    width: px(b.w),
    height: px(b.h),
    background: b.theme_bg || (isAvailable ? '#ffffff' : '#ddd'),
    color: b.theme_fg || '#000',
    border: '1px solid #000',
  };

  const title = b.title || (isAvailable ? 'AVAILABLE NOW' : '—');

  return (
    <div
      role="button"
      aria-label={`${title} block`}
      tabIndex={0}
      className={"absolute overflow-hidden select-none cursor-pointer block-card " + (isAvailable ? "animate-pulseGlow available-stripes" : "")}
      style={style}
      onClick={()=>onClick(b)}
      onKeyDown={(e)=>{ if(e.key==='Enter') onClick(b); }}
      title={title}
    >
      {/* Content */}
      {b.img_url && b.status !== 'available' ? (
        <img src={b.img_url} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full grid place-items-center text-[10px] md:text-xs font-bold text-center px-1 drop-shadow">
          <div className="leading-tight">
            {title}
          </div>
          {isAvailable && (
            <div className="text-[9px] md:text-[11px] font-bold mt-0.5">
              RESERVE YOUR NAME • LOGO
            </div>
          )}
        </div>
      )}

      {/* Availability overlays */}
      {showAvailability && (
        <div className={"absolute inset-0 pointer-events-none "+(isAvailable ? "bg-green-300/20":"bg-red-300/20")} aria-hidden="true"></div>
      )}

      {isAvailable && <span className="ribbon">AVAILABLE</span>}
    </div>
  );
}
