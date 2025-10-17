import React, { useState, useEffect } from 'react';
import StudentLookup from '../components/StudentLookup';
import ClassLookupCascade from '../components/ClassLookupCascade';
import AssignmentAdder from '../components/AssignmentAdder';

const styles = {
  container: { maxWidth: '960px', margin: '0 auto', padding: '20px' },
  header: { fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333', textAlign: 'center' },
  section: { marginBottom: '40px', backgroundColor: '#ffffff', padding: '20px',
    borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)', width: '100%' }
};

export default function QuickAssign() {
  const [studentData, setStudentData] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [formResetKey, setFormResetKey] = useState(0);

  useEffect(() => {
    setStudentData(null);
    setClassDetails(null);
    setFormResetKey(prev => prev + 1);
  }, []);

  const onReset = () => {
    setStudentData(null);
    setClassDetails(null);
    setFormResetKey(prev => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Quick Assign</h2>
      <div style={styles.section}>
        <StudentLookup key={`student-${formResetKey}`} setStudentData={setStudentData} />
      </div>
      <div style={styles.section}>
        <ClassLookupCascade key={`class-${formResetKey}`} setClassDetails={setClassDetails} />
      </div>
      {studentData && (
        <div style={styles.section}>
          <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} onReset={onReset} />
        </div>
      )}
    </div>
  );
}
