// 설치 작업 타입
export enum OperationType {
  INSTALL = 'INSTALL',
  UNINSTALL = 'UNINSTALL',
  UPDATE = 'UPDATE',
}

// 서비스 설치 작업 요청
export interface BizAgentJob {
  type: OperationType;
}

// 서비스 설치 결과
export interface ServiceInstallResult {
  version: string;
  servicePort: string;
  satellitePort: string;
  type: OperationType;
  success: boolean;
  message?: string;
}

// 설치 정보 응답
export interface ProvInstallInfoRepBody {
  siteId: string | null;
  version: string;
  servicePort: string;
  satellitePort: string;
  javaOptions: string;
}

// 설치 파일 타입
export enum ProvInstallFileType {
  JAVA = 'JAVA',
  JAR = 'JAR',
  PROP = 'PROP',
  DATA = 'DATA',
}

// 설치 정보 응답 래퍼
export interface ProvInstallInfoRepIvo {
  head: Record<string, any> | null;
  body: ProvInstallInfoRepBody;
}