const { useState } = React;

const initialStudents = [
  { id: 1, name: 'Aman', score: 78 },
  { id: 2, name: 'Riya', score: 100 },
  { id: 3, name: 'Karan', score: 90 },
  { id: 4, name: 'Neha', score: 90 },
];

const StudentRow = ({ student, onSave }) => {
  const [draftScore, setDraftScore] = useState(student.score);

  const handleSave = () => {
    const nextScore = Number(draftScore);
    if (Number.isNaN(nextScore) || nextScore < 0 || nextScore > 100) return;
    onSave(student.id, nextScore);
  };

  const status = student.score >= 40 ? 'pass' : 'fail';

  return (
    <tr>
      <td>
        <div className="student-name">{student.name}</div>
      </td>
      <td>
        <div className="score-badge">{student.score}</div>
      </td>
      <td>
        <div className={`status-pill ${status === 'fail' ? 'fail' : ''}`}>
          <span className="status-dot" />
          {status === 'pass' ? 'Pass' : 'Fail'}
        </div>
      </td>
      <td>
        <div className="row-action">
          <input
            type="number"
            value={draftScore}
            onChange={(e) => setDraftScore(e.target.value)}
            min="0"
            max="100"
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </td>
    </tr>
  );
};

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const passedCount = students.filter((student) => student.score >= 40).length;
  const averageScore = students.length
    ? Math.round(students.reduce((sum, student) => sum + student.score, 0) / students.length)
    : 0;

  const addStudent = () => {
    const trimmedName = name.trim();
    const numericScore = Number(score);

    if (!trimmedName || Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      return;
    }

    const nextStudent = {
      id: Date.now(),
      name: trimmedName,
      score: numericScore,
    };

    setStudents((current) => [nextStudent, ...current]);
    setName('');
    setScore('');
  };

  const updateScore = (id, nextScore) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, score: nextScore } : student
      )
    );
  };

  return (
    <div className="page-shell">
      <header className="header">
        <div>
          <p className="header__subtitle">Academic Terminal v2.0</p>
          <h1 className="header__title">Student Scoreboard</h1>
        </div>
      </header>

      <section className="panel card">
        <div className="table-heading">
          <span>Register Student</span>
          <span>New Entry</span>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Student name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Score (0–100)</label>
            <input
              type="number"
              placeholder="0"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <button type="button" onClick={addStudent}>
            + Add
          </button>
        </div>
      </section>

      <section className="panel card stats-grid">
        <div className="stat-box">
          <div className="stat-label">Total</div>
          <p className="stat-value">{students.length}</p>
        </div>
        <div className="stat-box">
          <div className="stat-label">Passed</div>
          <p className="stat-value">{passedCount}</p>
        </div>
        <div className="stat-box">
          <div className="stat-label">Avg Score</div>
          <p className="stat-value">{averageScore}</p>
        </div>
      </section>

      <section className="panel card table-shell">
        <div className="table-heading">
          <span>Student Records</span>
          <span>{students.length} entries</span>
        </div>
        <table className="record-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} onSave={updateScore} />
            ))}
          </tbody>
        </table>
      </section>

      <p className="footer-note">Designed with React and neon-inspired UI.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
