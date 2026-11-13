import { create } from 'zustand';
import { useEditorStore } from './editorStore';
import { LANGUAGES, LANGUAGE_MAP } from '../config/languages';
import * as aocStorage from '../services/aocStorage';

interface AocState {
  sidebarOpen: boolean;
  selectedYear: number;
  selectedDay: number | null;
  selectedPart: 1 | 2;

  toggleSidebar: () => void;
  setYear: (year: number) => void;
  selectDay: (day: number | null) => void;
  selectPart: (part: 1 | 2) => void;
  saveCurrentCode: () => void;
  saveAnswer: (answer: string, solved: boolean) => void;
}

function loadIntoEditor(year: number, day: number, part: 1 | 2): void {
  const saved = aocStorage.getPartSolution(year, day, part);
  const editorStore = useEditorStore.getState();

  if (saved.code) {
    const lang = LANGUAGE_MAP[saved.languageId] ?? LANGUAGES[0];
    editorStore.setLanguage(lang);
    // setLanguage resets code to defaultCode, so override after
    setTimeout(() => useEditorStore.getState().setCode(saved.code), 0);
  } else {
    editorStore.setCode(editorStore.language.defaultCode);
  }
}

function persistCurrentCode(state: AocState): void {
  if (state.selectedDay === null) return;
  const { code, language } = useEditorStore.getState();
  aocStorage.savePartSolution(state.selectedYear, state.selectedDay, state.selectedPart, {
    code,
    languageId: language.id,
  });
}

export const useAocStore = create<AocState>((set, get) => ({
  sidebarOpen: false,
  selectedYear: new Date().getFullYear(),
  selectedDay: null,
  selectedPart: 1,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setYear: (year) => {
    const state = get();
    persistCurrentCode(state);
    set({ selectedYear: year, selectedDay: null, selectedPart: 1 });
  },

  selectDay: (day) => {
    const state = get();
    persistCurrentCode(state);
    set({ selectedDay: day, selectedPart: 1 });
    if (day !== null) {
      loadIntoEditor(state.selectedYear, day, 1);
    }
  },

  selectPart: (part) => {
    const state = get();
    persistCurrentCode(state);
    set({ selectedPart: part });
    if (state.selectedDay !== null) {
      loadIntoEditor(state.selectedYear, state.selectedDay, part);
    }
  },

  saveCurrentCode: () => {
    const state = get();
    persistCurrentCode(state);
  },

  saveAnswer: (answer, solved) => {
    const state = get();
    if (state.selectedDay === null) return;
    const { code, language } = useEditorStore.getState();
    aocStorage.savePartSolution(state.selectedYear, state.selectedDay, state.selectedPart, {
      code,
      languageId: language.id,
      answer,
      solved,
    });
  },
}));
