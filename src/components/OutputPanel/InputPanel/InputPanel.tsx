import { useEditorStore } from '../../../store/editorStore';
import './InputPanel.scss';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function InputPanel() {
  const { stdin, setStdin } = useEditorStore();

  const lineCount = stdin ? stdin.split('\n').length : 0;
  const byteSize = new Blob([stdin]).size;

  return (
    <div className="input-panel">
      <textarea
        className="input-panel__textarea"
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="Paste your puzzle input here..."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      {stdin && (
        <div className="input-panel__meta">
          {lineCount.toLocaleString()} lines · {formatBytes(byteSize)}
        </div>
      )}
    </div>
  );
}
