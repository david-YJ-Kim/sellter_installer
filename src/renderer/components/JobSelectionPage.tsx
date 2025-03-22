import React, { useEffect, useState } from "react";
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
  Alert,
  CircularProgress,
} from "@mui/material";
import { OperationType } from "../../shared/types/IpcInterfaces";
import { IPC_CHANNELS } from "../../shared/constants/ipcChannels";

const JobSelectionPage: React.FC = () => {
  const [operation, setOperation] = useState<string>("");
  const [osType, setOsType] = useState<string>("");
  const [ipcResponse, setIpcResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // IPC 응답 리스너 설정
    const removeListener = window.electron.ipcRenderer.on(
      IPC_CHANNELS.BIZ_AGENT_JOB,
      (response) => {
        console.log("IPC Response received:", response);
        setIpcResponse(response);
        setIsLoading(false);

        if (response && typeof response === "object" && "success" in response) {
          setSuccess(response.success);
          if (!response.success && response.message) {
            setError(response.message);
          } else {
            setError(null);
          }
        } else {
          setSuccess(true);
          setError(null);
        }
      }
    );

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      if (removeListener) removeListener();
    };
  }, []);

  // OS 목록
  const osList = ["Windows", "MacOS"];

  // 작업 타입 목록
  const operationList = Object.values(OperationType);

  // 작업 타입 변경 핸들러
  const handleOperationChange = (event: SelectChangeEvent<string>) => {
    setOperation(event.target.value);
  };

  // OS 타입 변경 핸들러
  const handleOsChange = (event: SelectChangeEvent<string>) => {
    const selectedOs = event.target.value;
    if (selectedOs === "MacOS") {
      alert("MacOS is not available for now.");
    } else {
      setOsType(selectedOs);
    }
  };

  // 작업 실행 핸들러
  const handleAction = () => {
    if (!operation || !osType) {
      alert("Please select an OS and an operation.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setIpcResponse(null);

    const payload = {
      type: operation as OperationType,
    };

    // IPC 메시지 전송
    window.electron.ipcRenderer.sendMessage(IPC_CHANNELS.BIZ_AGENT_JOB, [
      payload,
    ]);
    console.log("Sent message to back-end:", payload);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Software Installation Manager
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* OS 선택 드롭다운 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select OS</InputLabel>
              <Select
                value={osType}
                label="Select OS"
                onChange={handleOsChange}
              >
                {osList.map((os) => (
                  <MenuItem key={os} value={os}>
                    {os}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 작업 선택 드롭다운 */}
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
                      operationType.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 작업 실행 버튼 */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAction}
              disabled={isLoading}
              sx={{ py: 1.5 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `${
                  operation
                    ? operation.charAt(0).toUpperCase() +
                      operation.slice(1).toLowerCase()
                    : "Execute"
                } Software`
              )}
            </Button>
          </Grid>

          {/* 결과 표시 */}
          {ipcResponse && (
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                {success ? (
                  <Alert severity="success">
                    Operation completed successfully
                  </Alert>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : null}

                <Typography variant="h6" sx={{ mt: 2 }}>
                  Response Details:
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    maxHeight: "150px",
                    overflow: "auto",
                  }}
                >
                  <pre>{JSON.stringify(ipcResponse, null, 2)}</pre>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobSelectionPage;
