import { OperationType } from './IpcMessageData';

export interface ServiceInstallResult {
  version: string;
  servicePort: string;
  statelitePort: string;
  type: OperationType;
}
