/// ------------------ THIS WILL HAVE THE HR CHECKBOXES TO USE FOR I-9, OFFER LETTER SENT AND MORE -------------------------

import React, { useState, useEffect, useRef } from 'react';
import {
  DataGridPro,
  gridDensitySelector,
  ToolbarButton,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid-pro';
import {
  Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormGroup, FormControlLabel, Checkbox, Box, Chip, Divider,
  Tooltip, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const DENSITY_OPTIONS = [
  { label: 'Compact density', value: 'compact' },
  { label: 'Standard density', value: 'standard' },
  { label: 'Comfortable density', value: 'comfortable' },
];

function CustomToolbar() {
  const apiRef = useGridApiContext();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const [densityMenuOpen, setDensityMenuOpen] = useState(false);
  const densityMenuTriggerRef = useRef(null);

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
      <Tooltip title="Adjust row density">
        <ToolbarButton
          ref={densityMenuTriggerRef}
          id="density-menu-trigger"
          aria-controls="density-menu"
          aria-haspopup="true"
          aria-expanded={densityMenuOpen ? 'true' : undefined}
          onClick={() => setDensityMenuOpen(true)}
        >
          <SettingsIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
      <Menu
        id="density-menu"
        anchorEl={densityMenuTriggerRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={densityMenuOpen}
        onClose={() => setDensityMenuOpen(false)}
        slotProps={{ list: { 'aria-labelledby': 'density-menu-trigger' } }}
      >
        {DENSITY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => { apiRef.current.setDensity(option.value); setDensityMenuOpen(false); }}
          >
            <ListItemIcon>{density === option.value && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </GridToolbarContainer>
  );
}

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
  const [loading, setLoading] = useState(false);

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
    setReviewStatus((prev) => ({ ...prev, [name]: checked }));
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
    { field: 'studentName', headerName: 'Student Name', headerAlign: 'center', flex: 1.5, minWidth: 150 },
    { field: 'student_ID', headerName: 'ASU ID', headerAlign: 'center', flex: 0.9, minWidth: 110 },
    { field: 'position', headerName: 'Position', headerAlign: 'center', flex: 1, minWidth: 110 },
    { field: 'weeklyHours', headerName: 'Hours', headerAlign: 'center', flex: 0.5, minWidth: 70, type: 'number' },
    { field: 'fultonFellow', headerName: 'Fulton Fellow', headerAlign: 'center', flex: 0.8, minWidth: 100 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', flex: 1.4, minWidth: 160 },
    { field: 'educationLevel', headerName: 'Education', headerAlign: 'center', width: 105 },
    { field: 'instructorName', headerName: 'Instructor Name', headerAlign: 'center', flex: 1.2, minWidth: 140 },
    {
      field: 'course',
      headerName: 'Course',
      headerAlign: 'center',
      flex: 1,
      minWidth: 120,
      valueGetter: (value, row) => `${row.subject} - ${row.catalogNum}`,
    },
    { field: 'classSession', headerName: 'Session', headerAlign: 'center', width: 100 },
    { field: 'classNum', headerName: 'Class #', headerAlign: 'center', width: 100 },
    { field: 'location', headerName: 'Location', headerAlign: 'center', width: 120 },
    { field: 'campus', headerName: 'Campus', headerAlign: 'center', width: 110 },
    { field: 'cur_gpa', headerName: 'Cur GPA', headerAlign: 'center', width: 100 },
    { field: 'cum_gpa', headerName: 'Cum GPA', headerAlign: 'center', width: 100 },
    { field: 'costCenterKey', headerName: 'Cost Center', headerAlign: 'center', width: 140 },
    { field: 'compensation', headerName: 'Compensation', headerAlign: 'center', ...usdPrice },
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
    { field: 'position_Number', headerName: 'Position Number', headerAlign: 'center', width: 130, editable: true }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE}/api/StudentClassAssignment`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load assignments');
        return res.json();
      })
      .then(data => {
        const mapped = data.map(r => ({
          id: r.Id,
          studentName: `${r.First_Name ?? ''} ${r.Last_Name ?? ''}`.trim(),
          student_ID: r.Student_ID,
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
          costCenterKey: r.CostCenterKey,
          compensation: r.Compensation,
          position_Number: r.Position_Number || '',
          i9_Sent: r.I9_Sent,
          ssN_Sent: r.SSN_Sent,
          offer_Sent: r.Offer_Sent,
          offer_Signed: r.Offer_Signed
        }));
        setRows(mapped);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
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
      return newRow;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  // Striped rows
  const getRowClassName = (params) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row';

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3, m: 2 }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Master Dashboard
            </Typography>
            <Chip
              label={`${rows.length} assignment${rows.length !== 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Helper tip */}
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
          Tip: Click the <b>Columns</b>{' '}
          <ViewColumnIcon sx={{ fontSize: '1.25rem', verticalAlign: 'text-bottom', display: 'inline' }} />{' '}
          button in the toolbar to show/hide fields. Click <b>Review</b> to update HR document status. Position Number is editable inline.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* DataGrid */}
        <div style={{ height: 'calc(100vh - 260px)', width: '100%' }}>
          <DataGridPro
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              '& .MuiDataGrid-cell': { textAlign: 'center' },
              '& .MuiDataGrid-toolbar': { justifyContent: 'flex-start' },
              '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', fontSize: '1.05em' },
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f9f9f9' },
              '& .even-row': {
                backgroundColor: '#fafafa',
                '&:hover': { backgroundColor: '#f0f0f0' },
              },
              '& .odd-row': {
                backgroundColor: '#ffffff',
                '&:hover': { backgroundColor: '#f5f5f5' },
              },
              '& .MuiDataGrid-footerContainer': { borderTop: '2px solid #e0e0e0' },
            }}
            rows={rows}
            columns={columns}
            getRowClassName={getRowClassName}
            loading={loading}
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 50, page: 0 } },
              density: 'standard',
              columns: {
                columnVisibilityModel: {
                  cum_gpa: false,
                  cur_gpa: false,
                  location: false,
                  campus: false,
                },
              },
            }}
            pageSizeOptions={[25, 50, 100, { value: rows.length || 1, label: 'All' }]}
            disableSelectionOnClick
            allowColumnReordering
            processRowUpdate={handleRowUpdate}
            slots={{ toolbar: CustomToolbar }}
            showToolbar
            headerFilters
          />
        </div>
      </Paper>

      {/* Modal for Review */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Review Assignment: {selectedRow?.studentName}</DialogTitle>
        <DialogContent dividers>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="i9_Sent" checked={reviewStatus.i9_Sent} onChange={handleCheckboxChange} />}
              label="I-9 Sent"
            />
            <FormControlLabel
              control={<Checkbox name="ssN_Sent" checked={reviewStatus.ssN_Sent} onChange={handleCheckboxChange} />}
              label="SSN Sent"
            />
            <FormControlLabel
              control={<Checkbox name="offer_Sent" checked={reviewStatus.offer_Sent} onChange={handleCheckboxChange} />}
              label="Offer Sent"
            />
            <FormControlLabel
              control={<Checkbox name="offer_Signed" checked={reviewStatus.offer_Signed} onChange={handleCheckboxChange} />}
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
