import React, { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from '@mui/material';

import {
  IpcMessageData,
  OperationType,
} from '../../config/interfaces/IpcMessageData';

const JobSelectionPage: React.FC = () => {
  const [operation, setOperation] = useState<string>('');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');

  const softwareList = ['Software A', 'Software B', 'Software C']; // Example software list

  const operationList = Object.values(OperationType);

  const handleOperationChange = (event: SelectChangeEvent<string>) => {
    setOperation(event.target.value);
  };

  const handleSoftwareChange = (event: SelectChangeEvent<string>) => {
    setSelectedSoftware(event.target.value);
  };

  const handleAction = () => {
    if (!operation || !selectedSoftware) {
      alert('Please select a software and an operation.');
      return;
    }

    const payload: IpcMessageData = {
      type: operation as OperationType,
      eventName: 'EVENT_NAME',
    };

    window.electron.ipcRenderer.sendMessage('TEST_MESSAGE_SEND2', [payload]);
    console.log('Complete send message to B/E.', payload);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Software Manager
        </Typography>

        <Grid container spacing={3}>
          {/* Software Selection Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Software</InputLabel>
              <Select
                value={selectedSoftware}
                label="Select Software"
                onChange={handleSoftwareChange}
              >
                {softwareList.map((software, index) => (
                  <MenuItem key={index} value={software}>
                    {software}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Operation Selection Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Operation</InputLabel>
              <Select
                value={operation}
                label="Select Operation"
                onChange={handleOperationChange}
              >
                {operationList.map((operationType) => (
                  <MenuItem key={operationType} value={operationType}>
                    {operationType.charAt(0).toUpperCase() +
                      operationType.slice(1)}{' '}
                    {/* Capitalize first letter */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Action Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAction}
            >
              Confirm{' '}
              {operation
                ? operation.charAt(0).toUpperCase() + operation.slice(1)
                : 'Action'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobSelectionPage;
