import { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const numericScore = Number(score);

    if (!trimmedName || Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      return;
    }

    onAddStudent({ name: trimmedName, score: numericScore });
    setName('');
    setScore('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Student name
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Score (0–100)
          <input
            type="number"
            placeholder="0"
            value={score}
            min="0"
            max="100"
            onChange={(event) => setScore(event.target.value)}
          />
        </label>
      </div>
      <button type="submit">+ Add</button>
    </form>
  );
}

export default AddStudentForm;
