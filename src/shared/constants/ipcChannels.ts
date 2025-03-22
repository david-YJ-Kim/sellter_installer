// IPC 통신 채널 정의
export const IPC_CHANNELS = {
  // 기본 테스트용 채널
  IPC_EXAMPLE: 'ipc-example',
  
  // 비즈니스 에이전트 작업 채널
  BIZ_AGENT_JOB: 'BIZ_AGENT_JOB',
  
  // 윈도우 관리 채널
  WINDOW_MAKE_MINI: 'window_make_mini',
  WINDOW_MAKE_MAX: 'window_make_max',
  WINDOW_MAKE_CLOSE: 'window_make_close',
  
  // 앱 데이터 관련 채널
  APP_GET_APPDATA: 'app_get_appdata',
};

// 모든 채널 타입을 하나로 묶어서 내보냄
export type Channels = 
  | 'ipc-example'
  | 'BIZ_AGENT_JOB'
  | 'window_make_mini'
  | 'window_make_max'
  | 'window_make_close'
  | 'app_get_appdata';