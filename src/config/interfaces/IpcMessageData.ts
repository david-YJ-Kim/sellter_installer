export enum OperationType {
  INSTALL = 'INSTALL',
  UNINSTALL = 'UNINSTALL',
  UPDATE = 'UPDATE',
}

export interface BizAgentJob {
  type: OperationType;
}
