import axios from 'axios';

const BASE_URL = 'https://emkc.org/api/v2/piston';

export interface PistonStageResult {
  stdout: string;
  stderr: string;
  output: string;
  code: number | null;
  signal: string | null;
}

export interface PistonResponse {
  language: string;
  version: string;
  run: PistonStageResult;
  compile?: PistonStageResult;
}

export async function executeCode(
  language: string,
  version: string,
  code: string,
  stdin = '',
): Promise<PistonResponse> {
  const { data } = await axios.post<PistonResponse>(`${BASE_URL}/execute`, {
    language,
    version,
    files: [{ content: code }],
    stdin,
  });
  return data;
}
