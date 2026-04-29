import { useState } from 'react';
import Header from './Header.jsx';
import AddStudentForm from './AddStudentForm.jsx';
import StudentTable from './StudentTable.jsx';

const initialStudents = [
  { id: 1, name: 'Aman', score: 78 },
  { id: 2, name: 'Riya', score: 100 },
  { id: 3, name: 'Karan', score: 90 },
  { id: 4, name: 'Neha', score: 90 },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  const addStudent = (student) => {
    setStudents((current) => [
      { id: Date.now(), ...student },
      ...current,
    ]);
  };

  const saveScore = (studentId, newScore) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === studentId ? { ...student, score: newScore } : student
      )
    );
  };

  const passedCount = students.filter((student) => student.score >= 40).length;
  const averageScore = students.length
    ? Math.round(
        students.reduce((sum, student) => sum + student.score, 0) / students.length
      )
    : 0;

  return (
    <div className="app-shell">
      <div className="hero-panel">
        <Header title="Student Scoreboard" subtitle="Academic Terminal v2.0" />
        <AddStudentForm onAddStudent={addStudent} />
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{students.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Passed</div>
            <div className="stat-value">{passedCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Score</div>
            <div className="stat-value">{averageScore}</div>
          </div>
        </div>
      </div>

      <StudentTable students={students} onSaveScore={saveScore} />
    </div>
  );
}

export default App;
