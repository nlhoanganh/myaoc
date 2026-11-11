import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useEditorStore } from '../../store/editorStore';
import { useExecutionStore } from '../../store/executionStore';
import { InputPanel } from './InputPanel/InputPanel';
import './OutputPanel.scss';

type Tab = 'input' | 'output' | 'errors';

export function OutputPanel() {
  const { stdin } = useEditorStore();
  const { status, stdout, stderr, compileOutput, reset } = useExecutionStore();
  const [activeTab, setActiveTab] = useState<Tab>('input');

  useEffect(() => {
    if (status === 'success') {
      setActiveTab('output');
    } else if (status === 'error' && !stdout && (stderr || compileOutput)) {
      setActiveTab('errors');
    }
  }, [status, stdout, stderr, compileOutput]);

  const errorContent = [compileOutput, stderr].filter(Boolean).join('\n');

  return (
    <div className="output-panel">
      <div className="output-panel__header">
        <div className="output-panel__tabs">
          <button
            className={clsx('output-panel__tab', {
              'output-panel__tab--active': activeTab === 'input',
            })}
            onClick={() => setActiveTab('input')}
          >
            Input
            {stdin && <span className="output-panel__badge output-panel__badge--neutral" />}
          </button>
          <button
            className={clsx('output-panel__tab', {
              'output-panel__tab--active': activeTab === 'output',
            })}
            onClick={() => setActiveTab('output')}
          >
            Output
            {status === 'success' && stdout && (
              <span className="output-panel__badge output-panel__badge--success" />
            )}
          </button>
          <button
            className={clsx('output-panel__tab', {
              'output-panel__tab--active': activeTab === 'errors',
            })}
            onClick={() => setActiveTab('errors')}
          >
            Errors
            {status === 'error' && errorContent && (
              <span className="output-panel__badge output-panel__badge--error" />
            )}
          </button>
        </div>

        {status !== 'idle' && (
          <button className="output-panel__clear" onClick={reset} title="Clear output">
            ✕
          </button>
        )}
      </div>

      <div className="output-panel__body">
        {activeTab === 'input' && <InputPanel />}

        {activeTab === 'output' && (
          <>
            {status === 'running' && (
              <div className="output-panel__running">
                <span className="output-panel__spinner" />
                Running...
              </div>
            )}
            {status !== 'running' && (
              <pre
                className={clsx('output-panel__content', {
                  'output-panel__content--empty': !stdout,
                })}
              >
                {stdout || (status === 'idle' ? 'Run your code to see output here.' : 'No output.')}
              </pre>
            )}
          </>
        )}

        {activeTab === 'errors' && (
          <>
            {status === 'running' && (
              <div className="output-panel__running">
                <span className="output-panel__spinner" />
                Running...
              </div>
            )}
            {status !== 'running' && (
              <pre
                className={clsx('output-panel__content', 'output-panel__content--error', {
                  'output-panel__content--empty': !errorContent,
                })}
              >
                {errorContent || 'No errors.'}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  );
}
