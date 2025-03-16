import { create } from 'zustand';

interface ScreenOrientationState {
  isPortrait: boolean;
  setOrientation: (isPortrait: boolean) => void;
}

const useScreenOrientationStore = create<ScreenOrientationState>((set) => ({
  isPortrait: true,
  setOrientation: (isPortrait) => set({ isPortrait }),
}));

export default useScreenOrientationStore;
