import React, { useEffect, useState } from 'react';
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

import { BIZ_AGENT_JOB } from '../../code/IpcCommands';

const JobSelectionPage: React.FC = () => {
  const [operation, setOperation] = useState<string>('');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [ipcResponse, setIpcResponse] = useState<string | null>(null);

  useEffect(() => {
    // Listen for the IPC response from the main process
    window.electron.ipcRenderer.on(BIZ_AGENT_JOB, (event, response) => {
      console.log('IPC Response received:', response);
      setIpcResponse(response); // Update the state with the response
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      window.electron.ipcRenderer.removeAllListeners(BIZ_AGENT_JOB);
    };
  }, []);

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

    const payload: BizAgentJob = {
      type: operation as OperationType,
    };

    window.electron.ipcRenderer.sendMessage(BIZ_AGENT_JOB, [payload]);
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
      <h1>response: {ipcResponse}</h1>
    </Container>
  );
};

export default JobSelectionPage;
