import { useState } from 'react';

function StudentRow({ student, onSaveScore }) {
  const [draftScore, setDraftScore] = useState(student.score);
  let statusClass = 'fail';
  let statusText = 'Fail';
  if (student.score >= 40) {
    statusClass = 'pass';
    statusText = 'Pass';
  }

  const handleSave = () => {
    const nextScore = Number(draftScore);
    if (Number.isNaN(nextScore) || nextScore < 0 || nextScore > 100) {
      return;
    }
    onSaveScore(student.id, nextScore);
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>
        <span className={`status-pill ${statusClass}`}>
          <span className="status-dot" />
          {statusText}
        </span>
      </td>
      <td>
        <div className="row-actions">
          <input
            type="number"
            value={draftScore}
            min="0"
            max="100"
            onChange={(event) => setDraftScore(event.target.value)}
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;
