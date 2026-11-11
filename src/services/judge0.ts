import axios from 'axios';

const BASE_URL = 'https://ce.judge0.com';

export interface Judge0Response {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
}

// Judge0 status IDs: 3 = Accepted, 6 = Compilation Error, 7-12 = Runtime Errors
export async function executeCode(
  languageId: number,
  code: string,
  stdin = '',
): Promise<Judge0Response> {
  const { data } = await axios.post<Judge0Response>(
    `${BASE_URL}/submissions?base64_encoded=false&wait=true`,
    { source_code: code, language_id: languageId, stdin },
  );
  return data;
}
