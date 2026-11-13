import { useAocStore } from '../../store/aocStore';
import { AocCalendar } from './AocCalendar';
import { AocDayDetail } from './AocDayDetail';
import './AocSidebar.scss';

const YEARS = Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i);

export function AocSidebar() {
  const { sidebarOpen, selectedYear, setYear } = useAocStore();

  if (!sidebarOpen) return null;

  return (
    <div className="aoc-sidebar">
      <div className="aoc-sidebar__banner">
        .~'~.~'~.~'~.~'~.
        <br />
        &nbsp; Advent of Code
        <br />
        '~.~'~.~'~.~'~.~'
      </div>

      <div className="aoc-sidebar__year">
        <label className="aoc-sidebar__year-label">&gt; Year:</label>
        <select
          className="aoc-sidebar__year-select"
          value={selectedYear}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              [{y}]
            </option>
          ))}
        </select>
      </div>

      <AocCalendar />

      <AocDayDetail />
    </div>
  );
}
