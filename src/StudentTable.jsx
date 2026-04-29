import StudentRow from './StudentRow.jsx';

function StudentTable({ students, onSaveScore }) {
  return (
    <section className="table-panel">
      <div className="table-header">
        <span>Student Records</span>
        <span>{students.length} entries</span>
      </div>
      <table className="student-table">
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
            <StudentRow
              key={student.id}
              student={student}
              onSaveScore={onSaveScore}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StudentTable;
