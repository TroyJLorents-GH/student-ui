import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';

const MODULES = [
  {
    label: 'Quick Assign',
    description: 'Add or update a single students assignment quickly.',
  },
  {
    label: 'Manage Student Assignments',
    description: 'Approve, edit, or archive assignments and track status.',
  },
  {
    label: 'Applications',
    description: 'Review applicant pools and status for TA/Grader/IA roles.',
  },
  {
    label: 'Student Class Summary',
    description: 'At-a-glance student profiles and assignment eligibility.',
  },
  {
    label: 'Bulk Upload',
    description: 'Upload spreadsheets to create or update many assignments at once.',
  },
  {
    label: 'Faculty Dashboard',
    description: 'Your course-specific roster of students, roles, and hours (Read-only).',
  },
  {
    label: 'Master Dashboard',
    description: 'Unified overview of students and assignments across all courses.',
  },
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight={700} color="#8c1d40">
          Student Assignment Management System (SAMS)
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.5, color: 'text.secondary' }}>
          SAMS streamlines how SCAI faculty and staff review applicants, create TA/Grader/IA assignments,
          and manage student workloads.
        </Typography>
      </Box>

      {/* Module list */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Available Modules
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#ffff' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Module</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MODULES.map((m) => (
                <TableRow key={m.label}>
                  <TableCell sx={{ width: '35%', fontWeight: 600 }}>{m.label}</TableCell>
                  <TableCell>{m.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
