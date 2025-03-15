import { create } from 'zustand';
import { Short } from '../types';

interface Store {
  shortList: Short[];
  setShortList: (shorts: Short[]) => void;
  setComment: (id: string, comment: string) => void;
}

const useStore = create<Store>((set) => ({
  shortList: [],
  setShortList: (shorts: Short[]) => set({ shortList: shorts }),
  setComment: (id: string, comment: string) =>
    set((state) => {
      const updatedShortList = state.shortList.map((short) => {
        if (short.id === id) {
          return {
            ...short,
            comments: [
              ...short.comments,
              {
                id: `c${String(short.comments.length + 1).padStart(3, '0')}`,
                author: '테스터',
                content: comment,
                createdAt: new Date(),
              },
            ],
          };
        }
        return short;
      });
      return { shortList: updatedShortList };
    }),
}));

export default useStore;
