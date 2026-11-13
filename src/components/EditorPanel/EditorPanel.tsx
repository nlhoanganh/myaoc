import { useEffect, useRef } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import type { editor as EditorTypes, Position } from 'monaco-editor';
import { useEditorStore } from '../../store/editorStore';
import { useAocStore } from '../../store/aocStore';
import { JAVA_IMPORTS } from '../../config/javaImports';
import './EditorPanel.scss';

// Captured in onMount, used by the import command at execution time
let editorRef: EditorTypes.IStandaloneCodeEditor | null = null;

// Guard against double-registration (React StrictMode mounts twice in dev)
let javaProviderRegistered = false;

const handleBeforeMount: BeforeMount = (monaco) => {
  if (javaProviderRegistered) return;
  javaProviderRegistered = true;

  // Register a command that inserts the import statement.
  // Using a command (instead of additionalTextEdits) guarantees the edit runs
  // against the live model state at acceptance time via executeEdits.
  monaco.editor.registerCommand('java.addImport', (_accessor: unknown, fullPath: string) => {
    if (!editorRef) return;

    const model = editorRef.getModel();
    if (!model) return;

    // Skip if already imported
    if (model.getValue().includes(`import ${fullPath};`)) return;

    // Find the last existing import line (1-indexed), 0 = no imports yet
    const lines = model.getLinesContent();
    let lastImportLine = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trimStart().startsWith('import ')) lastImportLine = i + 1;
    }

    // Insert after the last import, or at the very top of the file
    editorRef.executeEdits('java-autoimport', [
      {
        range: new monaco.Range(lastImportLine + 1, 1, lastImportLine + 1, 1),
        text: `import ${fullPath};\n`,
      },
    ]);
  });

  monaco.languages.registerCompletionItemProvider('java', {
    provideCompletionItems(model: EditorTypes.ITextModel, position: Position) {
      const word = model.getWordUntilPosition(position);
      if (!word.word) return { suggestions: [] };

      const wordLower = word.word.toLowerCase();
      const content = model.getValue();

      const replacementRange = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions = JAVA_IMPORTS.filter((imp) =>
        imp.simpleName.toLowerCase().startsWith(wordLower),
      ).map((imp) => {
        const alreadyImported = content.includes(`import ${imp.fullPath};`);

        return {
          label: { label: imp.simpleName, description: imp.fullPath },
          kind: monaco.languages.CompletionItemKind.Class,
          detail: imp.description,
          documentation: { value: `\`\`\`java\nimport ${imp.fullPath};\n\`\`\`` },
          insertText: imp.simpleName,
          range: replacementRange,
          // Already-imported items sort above new ones
          sortText: alreadyImported ? `0${imp.simpleName}` : `1${imp.simpleName}`,
          // Fire the import command after the completion text is inserted
          command: alreadyImported
            ? undefined
            : { id: 'java.addImport', title: 'Add import', arguments: [imp.fullPath] },
        };
      });

      return { suggestions };
    },
  });
};

export function EditorPanel() {
  const { code, language, theme, fontSize, setCode, setCursor } = useEditorStore();
  const saveCurrentCode = useAocStore((s) => s.saveCurrentCode);
  const selectedDay = useAocStore((s) => s.selectedDay);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-save code to localStorage when a day is selected (debounced)
  useEffect(() => {
    if (selectedDay === null) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveCurrentCode(), 1000);
    return () => clearTimeout(debounceRef.current);
  }, [code, selectedDay, saveCurrentCode]);

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  const handleMount: OnMount = (editor) => {
    editorRef = editor;
    editor.onDidChangeCursorPosition(({ position }) => {
      setCursor(position.lineNumber, position.column);
    });
  };

  return (
    <div className="editor-panel">
      <Editor
        language={language.monacoLanguage}
        value={code}
        theme={monacoTheme}
        onChange={(val) => setCode(val ?? '')}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        loading={<div className="editor-panel__loading">Loading editor...</div>}
        options={{
          fontSize,
          fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          automaticLayout: true,
          tabSize: 4,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}
