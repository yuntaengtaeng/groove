import { create } from 'zustand';
import { Short } from '../types';

interface Store {
  shortList: Short[];
  setShortList: (shorts: Short[]) => void;
}

const useStore = create<Store>((set) => ({
  shortList: [],
  setShortList: (shorts: Short[]) => set({ shortList: shorts }),
}));

export default useStore;
