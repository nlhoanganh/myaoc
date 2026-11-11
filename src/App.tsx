import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Toaster } from 'sonner';
import { useEditorStore } from './store/editorStore';
import { Header } from './components/Header/Header';
import { EditorPanel } from './components/EditorPanel/EditorPanel';
import { OutputPanel } from './components/OutputPanel/OutputPanel';
import { StatusBar } from './components/StatusBar/StatusBar';
import './App.scss';

function App() {
  const theme = useEditorStore((s) => s.theme);

  return (
    <div className="app" data-theme={theme}>
      <Toaster theme={theme} position="top-right" richColors />
      <Header />
      <main className="app__main">
        <PanelGroup direction="horizontal" className="app__panels">
          <Panel defaultSize={60} minSize={25}>
            <EditorPanel />
          </Panel>
          <PanelResizeHandle className="app__resize-handle" />
          <Panel defaultSize={40} minSize={20}>
            <OutputPanel />
          </Panel>
        </PanelGroup>
      </main>
      <StatusBar />
    </div>
  );
}

export default App;
