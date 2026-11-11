export interface LanguageConfig {
  id: string;
  name: string;
  monacoLanguage: string;
  judge0Id: number;
  fileExtension: string;
  defaultCode: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    id: 'java',
    name: 'Java',
    monacoLanguage: 'java',
    judge0Id: 62,
    fileExtension: '.java',
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
];

export const LANGUAGE_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.id, l]));
