import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as childProcess from 'child_process';
import axios from 'axios';
import FileManager from './fileManager';
import DownloadManager from './downloadManager';
import PortManager from './portManager';
import appConfig from './config';
import { BizAgentJob, OperationType, ServiceInstallResult } from '../shared/types/IpcInterfaces';

// 전역 경로 저장 객체
let globalPaths: Record<string, string> = {};

/**
 * 비즈니스 핸들러 클래스
 */
class BizHandler {
  private fileManager: FileManager;
  private portManager: PortManager;
  
  constructor() {
    this.fileManager = new FileManager();
    this.portManager = new PortManager();
  }
  
  /**
   * 비즈니스 작업을 처리합니다.
   * @param event IPC 이벤트
   * @param payload 작업 정보
   * @returns 처리 결과
   */
  async handleJob(event: Electron.IpcMainEvent, payload: BizAgentJob[]): Promise<ServiceInstallResult | string> {
    const operationType = payload[0].type;
    
    console.log(`BizHandler: Handling ${operationType} job`);
    
    switch (operationType) {
      case OperationType.INSTALL:
        console.log('BizHandler: Starting installation job');
        try {
          const result = await this.handleInstall();
          return result;
        } catch (error) {
          console.error('BizHandler: Installation failed:', error);
          return {
            version: '',
            servicePort: '',
            satellitePort: '',
            type: OperationType.INSTALL,
            success: false,
            message: `Installation failed: ${error.message}`
          };
        }
      
      case OperationType.UNINSTALL:
        console.log('BizHandler: Starting uninstallation job');
        return 'Uninstallation process started';
      
      case OperationType.UPDATE:
        console.log('BizHandler: Starting update job');
        return 'Update process started';
      
      default:
        console.log(`BizHandler: Undefined job type: ${operationType}`);
        return `Undefined job type: ${operationType}`;
    }
  }
  
  /**
   * 설치 작업을 처리합니다.
   * @returns 설치 결과
   */
  private async handleInstall(): Promise<ServiceInstallResult> {
    console.log('BizHandler: Handling installation');
    
    try {
      // 로컬 앱 데이터 경로 가져오기
      const localPath = process.env.LOCALAPPDATA || '';
      if (!localPath) {
        throw new Error('LOCALAPPDATA environment variable is not defined');
      }
      
      // 서버 설정
      const ip = appConfig.agent.server.ip;
      const port = appConfig.agent.server.port;
      const downloadUri = appConfig.agent.server.uri.download;
      const prefix = downloadUri.prefix;
      
      // 설치 정보 요청 URL
      const requestUrl = `${ip}:${port}/${prefix}/${downloadUri.getInfo}`;
      console.log(`BizHandler: Requesting installation info from ${requestUrl}`);
      
      // 서버에서 설치 정보 가져오기
      const response = await axios.get(requestUrl);
      const installInfo = response.data;
      
      console.log('BizHandler: Received installation info', installInfo);
      
      // 설치 정보 추출
      const version = installInfo.body.version;
      const servicePort = installInfo.body.servicePort;
      const satellitePort = installInfo.body.satellitePort;
      const javaOpts = installInfo.body.javaOptions;
      
      // 사용 가능한 포트 찾기
      const availablePort = await this.portManager.findAvailablePort(servicePort);
      console.log(`BizHandler: Found available port: ${availablePort}`);
      
      // 디렉토리 설정
      globalPaths = await this.fileManager.setupDirectories(
        localPath,
        version,
        javaOpts,
        availablePort.toString()
      );
      
      // 파일 다운로드
      const downloadManager = new DownloadManager(globalPaths);
      await downloadManager.downloadAllFiles();
      
      // 서비스 백그라운드 실행
      await this.runServiceBackground();
      
      // 결과 반환
      return {
        version,
        servicePort: availablePort.toString(),
        satellitePort,
        type: OperationType.INSTALL,
        success: true
      };
    } catch (error) {
      console.error('BizHandler: Installation error:', error);
      throw error;
    }
  }
  
  /**
   * 서비스를 백그라운드에서 실행합니다.
   */
  private async runServiceBackground(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log('BizHandler: Running service in background');
        
        if (!globalPaths.SRV_BIN) {
          throw new Error('SRV_BIN path is not defined');
        }
        
        const vbsFile = path.join(globalPaths.SRV_BIN, appConfig.agent.file.name.vbs);
        
        console.log(`BizHandler: Executing VBS file: ${vbsFile}`);
        
        // VBS 파일 실행
        const child = childProcess.exec(vbsFile);
        
        child.on('exit', (code) => {
          if (code === 0) {
            console.log('BizHandler: Service started successfully');
            resolve();
          } else {
            reject(new Error(`VBS script exited with code ${code}`));
          }
        });
        
        child.on('error', (error) => {
          reject(error);
        });
        
        // 5초 후 완료로 간주 (비동기 실행이므로)
        setTimeout(() => {
          console.log('BizHandler: Service start timeout reached, assuming success');
          resolve();
        }, 5000);
      } catch (error) {
        console.error('BizHandler: Error running service in background:', error);
        reject(error);
      }
    });
  }
}

export default BizHandler;