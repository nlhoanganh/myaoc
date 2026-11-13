import { useState, useEffect } from 'react';
import { useAocStore } from '../../store/aocStore';
import { getPartSolution } from '../../services/aocStorage';

export function AocDayDetail() {
  const { selectedYear, selectedDay, selectedPart, selectPart, saveAnswer } = useAocStore();

  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (selectedDay === null) return;
    const part = getPartSolution(selectedYear, selectedDay, selectedPart);
    setAnswer(part.answer);
    setSolved(part.solved);
  }, [selectedYear, selectedDay, selectedPart]);

  if (selectedDay === null) return null;

  function handleSave() {
    saveAnswer(answer, true);
    setSolved(true);
  }

  function handleClear() {
    saveAnswer('', false);
    setAnswer('');
    setSolved(false);
  }

  return (
    <div className="aoc-day-detail">
      <div className="aoc-day-detail__header">
        --- Day {selectedDay} ---
      </div>

      <div className="aoc-day-detail__tabs">
        <button
          className={`aoc-day-detail__tab${selectedPart === 1 ? ' aoc-day-detail__tab--active' : ''}`}
          onClick={() => selectPart(1)}
        >
          Part 1
        </button>
        <button
          className={`aoc-day-detail__tab${selectedPart === 2 ? ' aoc-day-detail__tab--active' : ''}`}
          onClick={() => selectPart(2)}
        >
          Part 2
        </button>
      </div>

      <div className="aoc-day-detail__field">
        <label className="aoc-day-detail__label">&gt; Answer:</label>
        <input
          className="aoc-day-detail__input"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="your answer..."
          spellCheck={false}
        />
      </div>

      <div className="aoc-day-detail__status">
        {solved ? (
          <span className="aoc-day-detail__solved">* Solved</span>
        ) : (
          <span className="aoc-day-detail__unsolved">. Unsolved</span>
        )}
      </div>

      <div className="aoc-day-detail__actions">
        <button className="aoc-day-detail__btn aoc-day-detail__btn--save" onClick={handleSave}>
          [Save Answer]
        </button>
        {solved && (
          <button className="aoc-day-detail__btn aoc-day-detail__btn--clear" onClick={handleClear}>
            [Clear]
          </button>
        )}
      </div>
    </div>
  );
}
