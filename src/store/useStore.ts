import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface CalculatorState {
  selectedCalculator: string;
  themeMode: ThemeMode;
  setSelectedCalculator: (calculator: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

export const useStore = create<CalculatorState>((set) => ({
  selectedCalculator: 'loan',
  themeMode: 'light',
  setSelectedCalculator: (selectedCalculator) => set({ selectedCalculator }),
  setThemeMode: (themeMode) => set({ themeMode }),
  toggleThemeMode: () => set((state) => ({ 
    themeMode: state.themeMode === 'light' ? 'dark' : 'light' 
  })),
}));