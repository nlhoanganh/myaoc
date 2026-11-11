import { create } from 'zustand';
import { LANGUAGES, LanguageConfig } from '../config/languages';

interface EditorState {
  code: string;
  language: LanguageConfig;
  theme: 'dark' | 'light';
  fontSize: number;
  cursor: { line: number; column: number };
  stdin: string;
  setCode: (code: string) => void;
  setLanguage: (lang: LanguageConfig) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setFontSize: (size: number) => void;
  setCursor: (line: number, column: number) => void;
  setStdin: (stdin: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  code: LANGUAGES[0].defaultCode,
  language: LANGUAGES[0],
  theme: 'dark',
  fontSize: 14,
  cursor: { line: 1, column: 1 },
  stdin: '',
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language, code: language.defaultCode }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize: Math.max(10, Math.min(24, fontSize)) }),
  setCursor: (line, column) => set({ cursor: { line, column } }),
  setStdin: (stdin) => set({ stdin }),
}));
