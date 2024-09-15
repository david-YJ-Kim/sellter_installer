export enum OperationType {
  INSTALL = 'INSTALL',
  UNINSTALL = 'UNINSTALL',
  UPDATE = 'UPDATE',
}

export interface IpcMessageData {
  type: OperationType;
  eventName: string;
}
