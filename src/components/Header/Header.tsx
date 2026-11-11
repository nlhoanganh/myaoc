import { toast } from 'sonner';
import clsx from 'clsx';
import { LANGUAGES } from '../../config/languages';
import { useEditorStore } from '../../store/editorStore';
import { useExecutionStore } from '../../store/executionStore';
import './Header.scss';

export function Header() {
  const { code, language, theme, fontSize, stdin, setLanguage, setTheme, setFontSize } =
    useEditorStore();
  const { run, status } = useExecutionStore();

  const isRunning = status === 'running';

  async function handleRun() {
    if (isRunning) return;
    await run(code, language, stdin);
    const finalStatus = useExecutionStore.getState().status;
    if (finalStatus === 'success') {
      toast.success('Executed successfully');
    } else {
      toast.error('Execution failed');
    }
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = LANGUAGES.find((l) => l.id === e.target.value);
    if (lang) setLanguage(lang);
  }

  return (
    <header className="header">
      <div className="header__left">
        <span className="header__logo">{'</>'}</span>
        <span className="header__title">CodeEditor</span>
      </div>

      <div className="header__center">
        <select
          className="header__language-select"
          value={language.id}
          onChange={handleLanguageChange}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="header__right">
        <button
          className="header__theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <div className="header__font-size">
          <button onClick={() => setFontSize(fontSize - 1)} title="Decrease font size">
            −
          </button>
          <span>{fontSize}px</span>
          <button onClick={() => setFontSize(fontSize + 1)} title="Increase font size">
            +
          </button>
        </div>

        <button
          className={clsx('header__run-btn', { 'header__run-btn--running': isRunning })}
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? '◌ Running...' : '▶ Run'}
        </button>
      </div>
    </header>
  );
}
