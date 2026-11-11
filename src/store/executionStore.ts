import { create } from 'zustand';
import { executeCode } from '../services/judge0';
import { LanguageConfig } from '../config/languages';

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

interface ExecutionState {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  compileOutput: string;
  exitCode: number | null;
  statusDescription: string;
  run: (code: string, language: LanguageConfig, stdin?: string) => Promise<void>;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  status: 'idle',
  stdout: '',
  stderr: '',
  compileOutput: '',
  exitCode: null,
  statusDescription: '',

  reset: () =>
    set({ status: 'idle', stdout: '', stderr: '', compileOutput: '', exitCode: null, statusDescription: '' }),

  run: async (code, language, stdin = '') => {
    set({ status: 'running', stdout: '', stderr: '', compileOutput: '', exitCode: null });
    try {
      const result = await executeCode(language.judge0Id, code, stdin);

      // Judge0 status 3 = Accepted; 6 = Compilation Error; 7-12 = Runtime Errors
      const isSuccess = result.status.id === 3;

      set({
        status: isSuccess ? 'success' : 'error',
        stdout: result.stdout ?? '',
        stderr: result.stderr ?? '',
        compileOutput: result.compile_output ?? '',
        exitCode: result.status.id,
        statusDescription: result.status.description,
      });
    } catch (err) {
      set({
        status: 'error',
        stderr: err instanceof Error ? err.message : 'Execution failed',
        exitCode: -1,
      });
    }
  },
}));
