
'use client';
import { create } from 'zustand';
import type { Block } from './types';

type State = {
  blocks: Block[];
  setBlocks: (b: Block[]) => void;
  focusId: string | null;
  setFocusId: (id: string | null) => void;
  updateStatus: (id: string, status: Block['status']) => void;
}

export const useAppStore = create<State>((set, get) => ({
  blocks: [],
  setBlocks: (b)=>set({blocks: b}),
  focusId: null,
  setFocusId: (id)=>set({focusId: id}),
  updateStatus: (id, status)=>{
    const list = get().blocks.slice();
    const idx = list.findIndex(b => b.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], status };
      set({ blocks: list });
    }
  }
}));
