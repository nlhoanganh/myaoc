// ---------------------------------------------------------------------------
// aocStorage.ts — Per-user solution storage backed by localStorage
//
// Each user gets their own key: "aoc_solutions_<username>"
// This keeps solutions isolated between accounts.
// ---------------------------------------------------------------------------

import { getCurrentUser } from './authStorage';

export interface PartSolution {
  code: string;
  languageId: string;
  answer: string;
  solved: boolean;
}

export interface DaySolution {
  part1: PartSolution;
  part2: PartSolution;
}

type SolutionsMap = Record<string, DaySolution>;

// -- Internal helpers -------------------------------------------------------

function storageKey(): string {
  const user = getCurrentUser() ?? 'guest';
  return `aoc_solutions_${user}`;
}

function makeKey(year: number, day: number): string {
  return `${year}-${day}`;
}

function emptyPart(): PartSolution {
  return { code: '', languageId: '', answer: '', solved: false };
}

function emptyDay(): DaySolution {
  return { part1: emptyPart(), part2: emptyPart() };
}

function readAll(): SolutionsMap {
  try {
    const raw = localStorage.getItem(storageKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data: SolutionsMap): void {
  localStorage.setItem(storageKey(), JSON.stringify(data));
}

// -- Public API -------------------------------------------------------------

export function getSolution(year: number, day: number): DaySolution {
  const all = readAll();
  return all[makeKey(year, day)] ?? emptyDay();
}

export function getPartSolution(year: number, day: number, part: 1 | 2): PartSolution {
  const daySol = getSolution(year, day);
  return part === 1 ? daySol.part1 : daySol.part2;
}

export function savePartSolution(
  year: number,
  day: number,
  part: 1 | 2,
  data: Partial<PartSolution>,
): void {
  const all = readAll();
  const key = makeKey(year, day);
  const existing = all[key] ?? emptyDay();
  const partKey = part === 1 ? 'part1' : 'part2';
  existing[partKey] = { ...existing[partKey], ...data };
  all[key] = existing;
  writeAll(all);
}

export function getAllSolutions(year: number): Record<number, DaySolution> {
  const all = readAll();
  const result: Record<number, DaySolution> = {};
  for (let day = 1; day <= 25; day++) {
    const sol = all[makeKey(year, day)];
    if (sol) result[day] = sol;
  }
  return result;
}
