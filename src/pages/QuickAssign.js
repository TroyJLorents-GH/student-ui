import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import StudentLookup from '../components/StudentLookup';
import ClassLookupCascade from '../components/ClassLookupCascade';
import AssignmentAdder from '../components/AssignmentAdder';

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
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: { xs: 2, md: 3 },
          color: '#333',
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
        }}
      >
        Quick Assign
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, mb: { xs: 2, md: 3 } }}>
        <StudentLookup key={`student-${formResetKey}`} setStudentData={setStudentData} />
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 2.5, md: 3 }, mb: { xs: 2, md: 3 } }}>
        <ClassLookupCascade key={`class-${formResetKey}`} setClassDetails={setClassDetails} />
      </Paper>

      {studentData && (
        <Box>
          <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} onReset={onReset} />
        </Box>
      )}
    </Container>
  );
}
