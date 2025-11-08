
export type BlockStatus = 'available' | 'reserved' | 'paid' | 'approved' | 'rejected';
export type BlockKind = 'brand' | 'name' | 'profile' | 'ad';

export interface Block {
  id: string;
  x: number; // grid units
  y: number; // grid units
  w: number; // grid units
  h: number; // grid units
  kind: BlockKind;
  title: string;
  text?: string;
  href?: string;
  img_url?: string;
  theme_bg?: string;
  theme_fg?: string;
  status: BlockStatus;
  category?: 'tech' | 'food' | 'fashion' | 'services' | 'creator' | 'other';
}

export interface BlockDraft {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: BlockKind;
  title: string;
  text?: string;
  href?: string;
  img_url?: string;
  theme_bg?: string;
  theme_fg?: string;
  category?: Block['category'];
}

export interface QuoteResponse {
  price_cents: number;
}

export interface AvailabilityResponse {
  ok: boolean;
  conflicts: string[];
}
