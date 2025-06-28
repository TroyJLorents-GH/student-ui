/// ------------------ THIS WILL HAVE THE HR CHECKBOXES TO USE FOR I-9, OFFER LETTER SENT AND MORE -------------------------


import React, { useState, useEffect } from 'react';
import {
  DataGrid
} from '@mui/x-data-grid';
import {
  Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const usdPrice = {
  type: 'number',
  width: 130,
  valueFormatter: (value) => currencyFormatter.format(value),
  cellClassName: 'font-tabular-nums',
};

export default function MasterDashboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [reviewStatus, setReviewStatus] = useState({
    i9_Sent: false,
    ssN_Sent: false,
    offer_Sent: false,
    offer_Signed: false,
  });

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    // TODO: fetch existing status for row if needed
    setReviewStatus({
      i9_Sent: row.i9_Sent ?? false,
      ssN_Sent: row.ssN_Sent ?? false,
      offer_Sent: row.offer_Sent ?? false,
      offer_Signed: row.offer_Signed ?? false,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setReviewStatus((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveReview = async () => {
    try {
      const payload = {
        position_Number: selectedRow.position_Number,
        ...reviewStatus
      };
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/StudentClassAssignment/${selectedRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) throw new Error('Failed to update assignment');
  
      // ✅ Update the local state to reflect saved checkboxes
      setRows((prevRows) =>
        prevRows.map(row =>
          row.id === selectedRow.id ? { ...row, ...payload } : row
        )
      );
  
      handleCloseModal();
    } catch (err) {
      console.error('Error updating assignment:', err);
    }
  };

  const columns = [
    { field: 'studentName', headerName: 'Student Name', headerAlign: 'center', flex: 1, minWidth: 150, maxWidth: 300 },
    { field: 'student_ID', headerName: 'ASU ID', headerAlign: 'center', width: 140 },
    { field: 'position', headerName: 'Position', headerAlign: 'center', width: 150 },
    { field: 'weeklyHours', headerName: 'Hours', headerAlign: 'center', width: 80 },
    { field: 'fultonFellow', headerName: 'Fulton Fellow', headerAlign: 'center', width: 120 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', flex: 1, minWidth: 150, maxWidth: 300, filterable: true },
    { field: 'educationLevel', headerName: 'Education', headerAlign: 'center', width: 120 },
    { field: 'instructorName', headerName: 'Instructor Name', headerAlign: 'center', flex: 1, minWidth: 150, maxWidth: 300 },
    { field: 'subject', headerName: 'Subject', headerAlign: 'center', width: 100 },
    { field: 'catalogNum', headerName: 'Catalog #', headerAlign: 'center', width: 100, type: 'number' },
    { field: 'classSession', headerName: 'Session', headerAlign: 'center', width: 100 },
    { field: 'location', headerName: 'Location', headerAlign: 'center', width: 120 },
    { field: 'campus', headerName: 'Campus', headerAlign: 'center', width: 110 },
    { field: 'classNum', headerName: 'Class #', headerAlign: 'center', width: 110 },
    { field: 'cur_gpa', headerName: 'Cur GPA', headerAlign: 'center', width: 110 },
    { field: 'cum_gpa', headerName: 'Cum GPA', headerAlign: 'center', width: 110 },
    { field: 'costCenterKey', headerName: 'Cost Center', headerAlign: 'center', width: 160 },
    { field: 'compensation', headerName: 'Compensation', headerAlign: 'center', width: 140, ...usdPrice },
    {
      field: 'review',
      headerName: 'Review',
      headerAlign: 'center',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleOpenModal(params.row)}>
          Review
        </Button>
      ),
    },
    { field: 'position_Number', headerName: 'Position Number', headerAlign: 'center', width: 140, editable: true}
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/StudentClassAssignment`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load assignments');
        return res.json();
      })
      .then(data => {
        const mapped = data.map(r => ({
          id: r.id,
          studentName: `${r.first_Name} ${r.last_Name}`,
          student_ID: r.student_ID,
          position: r.position,
          weeklyHours: r.weeklyHours,
          fultonFellow: r.fultonFellow,
          email: r.email,
          educationLevel: r.educationLevel,
          instructorName: `${r.instructorFirstName} ${r.instructorLastName}`,
          subject: r.subject,
          catalogNum: r.catalogNum,
          classSession: r.classSession,
          location: r.location,
          campus: r.campus,
          classNum: r.classNum,
          cum_gpa: r.cum_gpa,
          cur_gpa: r.cur_gpa,
          costCenterKey: r.costCenterKey,
          compensation: r.compensation,
          position_Number: r.position_Number || '',
          i9_Sent: r.i9_Sent,
          ssN_Sent: r.ssN_Sent,
          offer_Sent: r.offer_Sent,
          offer_Signed: r.offer_Signed
        }));
        setRows(mapped);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  const handleRowUpdate = async (newRow) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/StudentClassAssignment/${newRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position_Number: newRow.position_Number,
          i9_Sent: newRow.i9_Sent ?? false,
          ssN_Sent: newRow.ssN_Sent ?? false,
          offer_Sent: newRow.offer_Sent ?? false,
          offer_Signed: newRow.offer_Signed ?? false
        })
      });
  
      if (!response.ok) throw new Error('Failed to update position number');
  
      return newRow; // ✅ let DataGrid know update succeeded
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  if (error) {
    return (
      <Paper style={{ padding: 16, margin: 20 }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={0} style={{ height: 'fit-content', width: '100%', padding: 10 }}>
        <Typography variant="h5" gutterBottom>
          Master Dashboard
        </Typography>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '1.1em',
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0},
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          disableSelectionOnClick
          showToolbar
          allowColumnReordering={true}
          processRowUpdate={handleRowUpdate}
        />
      </Paper>

      {/* ✅ Modal for Review */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Review Assignment: {selectedRow?.studentName}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox 
                name="i9_Sent" 
                checked={reviewStatus.i9_Sent} 
                onChange={handleCheckboxChange} />}
                label="I-9 Sent"
            />
            <FormControlLabel
              control={<Checkbox 
                name="ssN_Sent" 
                checked={reviewStatus.ssN_Sent} 
                onChange={handleCheckboxChange} />}
                label="SSN Sent"
            />
            <FormControlLabel
              control={<Checkbox 
                name="offer_Sent" 
                checked={reviewStatus.offer_Sent} 
                onChange={handleCheckboxChange} />}
                label="Offer Sent"
            />
            <FormControlLabel
              control={<Checkbox 
                name="offer_Signed" 
                checked={reviewStatus.offer_Signed} 
                onChange={handleCheckboxChange} />}
                label="Offer Signed"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveReview} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
