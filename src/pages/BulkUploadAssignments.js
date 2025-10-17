import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Typography, Button, Paper, Box, Snackbar, Alert
} from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import SendIcon from '@mui/icons-material/Send';

const columnMapping = {
  'Position': 'Position',
  'FultonFellow': 'FultonFellow',
  'WeeklyHours': 'WeeklyHours',
  'Student_ID (ID number OR ASUrite accepted)': 'Student_ID',
  'ClassNum': 'ClassNum'
};

const baseUrl = process.env.REACT_APP_API_BASE;

const BulkUploadAssignments = () => {
  const [rows, setRows] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const mapped = data.map(row => {
        const result = {};
        Object.keys(columnMapping).forEach(excelCol => {
          result[columnMapping[excelCol]] = row[excelCol] ?? '';
        });
        return result;
      });

      setRows(mapped);
      setPreviewRows([]); // Reset preview when new file is loaded
    };
    reader.readAsBinaryString(file);
  };

  const handleCalibrate = async () => {
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${baseUrl}/api/StudentClassAssignment/calibrate-preview`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Calibration failed');

      const data = await response.json();
      setPreviewRows(data);
      setSnackbar({ open: true, message: 'Calibration successful!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleUpload = async () => {
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await fetch(`${baseUrl}/api/StudentClassAssignment/upload`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) throw new Error('Upload failed');
      setSnackbar({ open: true, message: 'Upload successful!', severity: 'success' });
      setRows([]);
      setPreviewRows([]);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bulk Upload Student Assignments
      </Typography>

      {/* Download template & upload picker */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          component="a"
          href={`${baseUrl}/api/StudentClassAssignment/template`}
          download="BulkUploadTemplate.csv"
        >
          Download CSV Template
        </Button>

        <Button variant="contained" component="label">
          Select CSV File
          <input
            type="file"
            hidden
            accept=".csv"
            onChange={handleFile}
          />
        </Button>
      </Box>

      {/* Show initial 5-column preview if file is uploaded, and calibration hasn't run yet */}
      {rows.length > 0 && previewRows.length === 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Preview ({rows.length} row{rows.length === 1 ? '' : 's'})
          </Typography>
          <Box sx={{
            width: '100%',
            minWidth: 600,
            maxWidth: '100vw',
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}>
            <DataGridPro
              rows={rows.map((row, idx) => ({ ...row, id: row.id ?? idx }))}
              columns={[
                { field: 'Position', headerName: 'Position', width: 110 },
                { field: 'FultonFellow', headerName: 'Fulton Fellow', width: 130 },
                { field: 'WeeklyHours', headerName: 'Weekly Hours', width: 130 },
                { field: 'Student_ID', headerName: 'Student ID/ASUrite', width: 180 },
                { field: 'ClassNum', headerName: 'Class Number', width: 140 },
              ]}
              density="compact"
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="info"
              onClick={handleCalibrate}
            >
              Request SQL Calibrate
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={handleUpload}
            >
              Submit to Database
            </Button>
          </Box>
        </>
      )}

      {/* Show full preview after calibration */}
      {previewRows.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Calibrated Preview ({previewRows.length} row{previewRows.length === 1 ? '' : 's'})
          </Typography>
          <Box sx={{
            width: '100%',
            minWidth: 1200,
            maxWidth: '100vw',
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}>
            <DataGridPro
              sx={{
                '& .MuiDataGrid-cell': { textAlign: 'center' },
                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', fontSize: '1.1em', textAlign: 'center' },
                '& .highlight-cell': {
                  backgroundColor: '#fff9c4',
                  fontWeight: 600,
                },
              }}
              rows={previewRows.map((row, idx) => ({
                ...row,
                id: row.id ?? idx,
                cum_gpa: row.cum_gpa !== undefined && row.cum_gpa !== null
                  ? Number(row.cum_gpa).toFixed(2)
                  : '',
                cur_gpa: row.cur_gpa !== undefined && row.cur_gpa !== null
                  ? Number(row.cur_gpa).toFixed(2)
                  : '',
                InstructorName: row.InstructorFirstName && row.InstructorLastName
                  ? `${row.InstructorFirstName} ${row.InstructorLastName}`.trim()
                  : (row.InstructorFirstName || '') + (row.InstructorLastName || ''),
              }))}
              columns={[
                { field: 'Position', headerName: 'Position', width: 90, headerAlign: 'center' },
                { field: 'FultonFellow', headerName: 'Fulton Fellow', width: 110, headerAlign: 'center' },
                { field: 'WeeklyHours', headerName: 'Weekly Hours', width: 110, headerAlign: 'center' },
                { field: 'Student_ID', headerName: 'Student ID', width: 110, headerAlign: 'center' },
                { field: 'ASUrite', headerName: 'ASUrite', width: 110, headerAlign: 'center' },
                { field: 'First_Name', headerName: 'First Name', width: 120, headerAlign: 'center' },
                { field: 'Last_Name', headerName: 'Last Name', width: 120, headerAlign: 'center' },
                { field: 'Degree', headerName: 'Degree', width: 90, headerAlign: 'center' },
                { field: 'cum_gpa', headerName: 'Cumulative GPA', width: 130, headerAlign: 'center' },
                { field: 'cur_gpa', headerName: 'Current GPA', width: 120, headerAlign: 'center' },
                { field: 'ClassNum', headerName: 'Class Number', width: 110, headerAlign: 'center' },
                { field: 'Subject', headerName: 'Subject', width: 90, headerAlign: 'center' },
                { field: 'CatalogNum', headerName: 'Catalog #', width: 95, headerAlign: 'center' },
                { field: 'SectionNum', headerName: 'Section #', width: 95, headerAlign: 'center' },
                { field: 'Session', headerName: 'Session', width: 90, headerAlign: 'center' },
                { field: 'InstructorID', headerName: 'Instructor ID', width: 120, headerAlign: 'center' },
                { field: 'InstructorName', headerName: 'Instructor Name', width: 170, headerAlign: 'center' },
                { field: 'Location', headerName: 'Location', width: 100, headerAlign: 'center' },
                { field: 'AcadCareer', headerName: 'Acad Career', width: 120, headerAlign: 'center' },
                { field: 'Component', headerName: 'Component', width: 110, headerAlign: 'center' },
                { field: 'InstructMode', headerName: 'Instruction Mode', width: 140, headerAlign: 'center' },
              ]}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              autoHeight
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleUpload}
            sx={{ mt: 2 }}
          >
            Submit to Database
          </Button>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BulkUploadAssignments;
