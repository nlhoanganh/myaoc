import { useAocStore } from '../../store/aocStore';
import { getAllSolutions } from '../../services/aocStorage';

// Years that have fewer than 25 problems
const TOTAL_DAYS_BY_YEAR: Record<number, number> = {
  2025: 12,
};

/**
 * Returns how many days are available for a given AoC year.
 * AoC releases one puzzle per day, Dec 1–25 (some years may have fewer).
 */
function getAvailableDays(year: number): number {
  const maxDays = TOTAL_DAYS_BY_YEAR[year] ?? 25;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (11 = December)
  const currentDay = now.getDate();

  if (year < currentYear) return maxDays;          // Past years
  if (year > currentYear) return 0;                // Future years: none
  if (currentMonth < 11) return 0;                 // Before December: none
  return Math.min(currentDay, maxDays);            // During December: up to today
}

export function AocCalendar() {
  const { selectedYear, selectedDay, selectDay } = useAocStore();
  const solutions = getAllSolutions(selectedYear);
  const availableDays = getAvailableDays(selectedYear);

  function getStars(day: number): string {
    const sol = solutions[day];
    if (!sol) return '..';
    const s1 = sol.part1.solved;
    const s2 = sol.part2.solved;
    if (s1 && s2) return '**';
    if (s1) return '*.';
    if (s2) return '.*';
    // Has code saved but not solved
    if (sol.part1.code || sol.part2.code) return '..';
    return '..';
  }

  function getStarClass(day: number): string {
    const sol = solutions[day];
    if (!sol) return '';
    if (sol.part1.solved && sol.part2.solved) return 'aoc-calendar__stars--gold';
    if (sol.part1.solved || sol.part2.solved) return 'aoc-calendar__stars--silver';
    if (sol.part1.code || sol.part2.code) return 'aoc-calendar__stars--wip';
    return '';
  }

  return (
    <div className="aoc-calendar">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => {
        const locked = day > availableDays;
        return (
          <button
            key={day}
            className={
              `aoc-calendar__day` +
              (selectedDay === day ? ' aoc-calendar__day--active' : '') +
              (locked ? ' aoc-calendar__day--locked' : '')
            }
            onClick={() => !locked && selectDay(selectedDay === day ? null : day)}
            disabled={locked}
          >
            <span className="aoc-calendar__day-num">{String(day).padStart(2, ' ')}</span>
            <span className={`aoc-calendar__stars ${locked ? '' : getStarClass(day)}`}>
              {locked ? '..' : getStars(day)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
