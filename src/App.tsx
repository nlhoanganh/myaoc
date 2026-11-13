import { useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Toaster } from 'sonner';
import { useEditorStore } from './store/editorStore';
import { useAuthStore } from './store/authStore';
import { Header } from './components/Header/Header';
import { EditorPanel } from './components/EditorPanel/EditorPanel';
import { OutputPanel } from './components/OutputPanel/OutputPanel';
import { StatusBar } from './components/StatusBar/StatusBar';
import { AocSidebar } from './components/AocSidebar/AocSidebar';
import { LoginPage } from './components/LoginPage/LoginPage';
import './App.scss';

function App() {
  const theme = useEditorStore((s) => s.theme);
  const user = useAuthStore((s) => s.user);
  const restoreSession = useAuthStore((s) => s.restoreSession);

  // On mount, check if there's an existing session in localStorage
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Not logged in — show the login page
  if (!user) {
    return <LoginPage />;
  }

  // Logged in — show the editor
  return (
    <div className="app" data-theme={theme}>
      <Toaster theme={theme} position="top-right" richColors />
      <Header />
      <main className="app__main">
        <AocSidebar />
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
