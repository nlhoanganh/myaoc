import clsx from 'clsx';
import { useEditorStore } from '../../store/editorStore';
import { useExecutionStore, ExecutionStatus } from '../../store/executionStore';
import './StatusBar.scss';

const STATUS_LABEL: Record<ExecutionStatus, string> = {
  idle: 'Ready',
  running: 'Running...',
  success: 'Success',
  error: 'Failed',
};

export function StatusBar() {
  const { language, cursor } = useEditorStore();
  const { status, statusDescription } = useExecutionStore();

  return (
    <div className="status-bar">
      <span className="status-bar__item">{language.name}</span>
      <span className="status-bar__item status-bar__item--dim">
        Ln {cursor.line}, Col {cursor.column}
      </span>
      <span className="status-bar__spacer" />
      <span className={clsx('status-bar__status', `status-bar__status--${status}`)}>
        {status !== 'idle' && status !== 'running' && statusDescription
          ? statusDescription
          : STATUS_LABEL[status]}
      </span>
    </div>
  );
}
