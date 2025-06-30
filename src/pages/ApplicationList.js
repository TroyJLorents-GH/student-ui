// // ----- Updated on 5/28 using DataGrid and likely the best one so far -----


import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Paper,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [degreeFilter, setDegreeFilter] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/MastersIAGraderApplication`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const filteredApplications = degreeFilter
    ? applications.filter(app => app.degreeProgram === degreeFilter)
    : applications;

    // const formatDate = (value) => {
    //   if (!value) return '';
    //   const date = new Date(value);
    //   return isNaN(date.getTime()) ? 'Invalid Date' : `${date.getMonth() + 1}/${date.getFullYear()}`;
    // };

  const columns = [
    // { field: 'id', headerName: 'ID', headerAlign: 'center', width: 70 },
    { field: 'name', headerName: 'Name', headerAlign: 'center', flex: 1 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', flex: 1.2 },
    { field: 'asU10DigitID', headerName: 'ASU ID', headerAlign: 'center', width: 120 },
    { field: 'degreeProgram', headerName: 'Degree Program', headerAlign: 'center', flex: 1.2 },
    { field: 'graduateGPA', headerName: 'Grad GPA', headerAlign: 'center', width: 110 },
    { field: 'undergraduateGPA', headerName: 'UG GPA', headerAlign: 'center', width: 110 },
    // {
    //   field: 'expectedGraduation',
    //   headerName: 'Expected Grad',
    //   headerAlign: 'center',
    //   width: 140,
    //   valueFormatter: ({ value }) => formatDate(value)
    // },
    { field: 'undergraduateInstitution', headerName: 'UG Institution', headerAlign: 'center', flex: 1 },
    { field: 'positionsConsidered', headerName: 'Positions', headerAlign: 'center', width: 160 },
    { field: 'hoursAvailable', headerName: 'Hours Available', headerAlign: 'center', width: 130 },
    { field: 'preferredCourses', headerName: 'Preferred Courses', headerAlign: 'center', flex: 1 },
    { field: 'programmingLanguage', headerName: ' Programming Languages', headerAlign: 'center', flex: 1 },
    { field: 'dissertationProposalStatus', headerName: 'Thesis Proposal', headerAlign: 'center', width: 180 },
    {
      field: 'expectedGraduation',
        headerName: 'Expected Grad',
        headerAlign: 'center',
        width: 140,
        renderCell: (params) => {
          const date = new Date(params.value);
          if (isNaN(date.getTime())) return 'Invalid Date';
          return `${date.getMonth() + 1}/${date.getFullYear()}`;
        }
    },
    {
      field: 'transcriptUrl',
      headerName: 'Transcript',
      headerAlign: 'center',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
        ) : 'N/A'
    },
    {
      field: 'resumeUrl',
      headerName: 'Resume',
      headerAlign: 'center',
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
        ) : 'N/A'
    }
  ];

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Masters Application List
      </Typography>

      <Box mb={2}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Filter by Degree Program</InputLabel>
          <Select
            value={degreeFilter}
            label="Filter by Degree Program"
            onChange={(e) => setDegreeFilter(e.target.value)}
          >
            <MenuItem value="">All Programs</MenuItem>
            <MenuItem value="M.S. in Software Engineering">M.S. in Software Engineering</MenuItem>
            <MenuItem value="M.S. in Computer Science">M.S. in Computer Science</MenuItem>
            <MenuItem value="M.S. in Computer Engineering- CS">M.S. in Computer Engineering- CS</MenuItem>
            <MenuItem value="M.S. in Computer Engineering- EE">M.S. in Computer Engineering- EE</MenuItem>
            <MenuItem value="M.C.S. Master of Computer Science on ground">M.C.S. on-ground</MenuItem>
            <MenuItem value="M.C.S. Master of Computer Science online">M.C.S. online</MenuItem>
            <MenuItem value="M.S. Industrial Engineering">M.S. Industrial Engineering</MenuItem>
            <MenuItem value="M.S. in Robotics and Autonomous Systems- AI">M.S. Robotics AI</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          Error: {error}
        </Typography>
      )}

      <div style={{ height: 'fit-content', width: '100%' }}>
        <DataGrid
          rows={filteredApplications}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={20}
          rowsPerPageOptions={[10, 20, 50]}
          loading={loading}
          showToolbar
          components={{ Toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '1.05rem'
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f9f9f9'
            }
          }}
        />
      </div>
    </Paper>
  );
};

export default ApplicationList;
