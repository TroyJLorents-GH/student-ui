// src/pages/StudentAssignmentDashboard.jsx
import React, { useEffect, useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Paper, Typography } from '@mui/material';

const baseUrl = process.env.REACT_APP_API_BASE; // keep consistent with your existing code

// function formatToLocal(dbDate) {
//   if (!dbDate) return '';
//   if (dbDate instanceof Date) return dbDate.toLocaleString();
//   let jsIsoDate = dbDate.includes('T') ? dbDate : dbDate.replace(' ', 'T') + 'Z';
//   return new Date(jsIsoDate).toLocaleString();
// }

export default function StudentAssignmentDashboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: 'studentName', headerName: 'Student Name', headerAlign: 'center', flex: 1, minWidth: 150, maxWidth: 300 },
    { field: 'student_ID', headerName: 'ASU ID', headerAlign: 'center', width: 140 },
    { field: 'asuRite', headerName: 'ASUrite', headerAlign: 'center', width: 110 },
    { field: 'position', headerName: 'Position', headerAlign: 'center', width: 150 },
    { field: 'weeklyHours', headerName: 'Hours', headerAlign: 'center', width: 90, type: 'number' },
    { field: 'fultonFellow', headerName: 'Fulton Scholar', headerAlign: 'center', width: 130 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', flex: 1, minWidth: 160, maxWidth: 260 },
    { field: 'educationLevel', headerName: 'Education', headerAlign: 'center', width: 120 },
    { field: 'instructorName', headerName: 'Instructor Name', headerAlign: 'center', flex: 1, minWidth: 160, maxWidth: 260 },
    { field: 'subject', headerName: 'Subject', headerAlign: 'center', width: 110 },
    { field: 'catalogNum', headerName: 'Catalog #', headerAlign: 'center', width: 110, type: 'number' },
    { field: 'classSession', headerName: 'Session', headerAlign: 'center', width: 110 },
    { field: 'location', headerName: 'Location', headerAlign: 'center', width: 130 },
    { field: 'campus', headerName: 'Campus', headerAlign: 'center', width: 120 },
    { field: 'classNum', headerName: 'Class #', headerAlign: 'center', width: 120 },
    { field: 'cum_gpa', headerName: 'Cum GPA', headerAlign: 'center', width: 100 },
    { field: 'cur_gpa', headerName: 'Cur GPA', headerAlign: 'center', width: 100 },
    // intentionally removed: Cost Center, Compensation, Review, Position Number, Reviewed, Date Created
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/Faculty/student-assignments`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load assignments');
        return res.json();
      })
      .then(data => {
        const mapped = data.map(r => ({
          id: r.Id,
          studentName: `${r.First_Name ?? ''} ${r.Last_Name ?? ''}`.trim(),
          student_ID: r.Student_ID,
          asuRite: r.ASUrite,
          position: r.Position,
          weeklyHours: r.WeeklyHours,
          fultonFellow: r.FultonFellow,
          email: r.Email,
          educationLevel: r.EducationLevel,
          instructorName: `${r.InstructorFirstName ?? ''} ${r.InstructorLastName ?? ''}`.trim(),
          subject: r.Subject,
          catalogNum: r.CatalogNum,
          classSession: r.ClassSession,
          location: r.Location,
          campus: r.Campus,
          classNum: r.ClassNum,
          cum_gpa: r.cum_gpa,
          cur_gpa: r.cur_gpa,
          // createdAt omitted on purpose for faculty view
        }));
        setRows(mapped);
        setError('');
      })
      .catch(err => {
        setError(err.message || 'Error loading data');
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <Paper style={{ padding: 16, margin: 20 }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Student Assignment Dashboard
      </Typography>
      <DataGridPro
        sx={{
          '& .MuiDataGrid-cell': { textAlign: 'center' },
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', fontSize: '1.05em' },
        }}
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 25, page: 0 } },
          density: 'compact',
        }}
        pageSizeOptions={[25, 50, 100]}
        disableSelectionOnClick
        allowColumnReordering
        showToolbar
        headerFilters
        // stripped: toolbar, headerFilters, processRowUpdate, modal, highlights
      />
    </div>
  );
}
