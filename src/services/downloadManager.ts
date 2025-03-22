import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import appConfig from './config';
import { ProvInstallFileType } from '../shared/types/IpcInterfaces';

// AdmZip 모듈은 CommonJS 모듈로 가져와야 함
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdmZip = require('adm-zip');

/**
 * 다운로드 관리자 클래스
 */
class DownloadManager {
  private globalPaths: Record<string, string>;
  
  constructor(globalPaths: Record<string, string>) {
    this.globalPaths = globalPaths;
  }
  
  /**
   * 필요한 모든 파일을 다운로드합니다.
   * @returns Promise - 다운로드 완료 시 해결됨
   */
  async downloadAllFiles(): Promise<void> {
    console.log('DownloadManager: Starting downloads');
    
    const propServer = appConfig.agent.server;
    const propFile = appConfig.agent.file.name;
    
    // 다운로드 URL 구성
    const baseURI = `${propServer.ip}:${propServer.port}/${propServer.uri.download.prefix}/${propServer.uri.download.downReq}?type=`;
    
    const javaDownUrl = baseURI + ProvInstallFileType.JAVA;
    const jarDownUrl = baseURI + ProvInstallFileType.JAR;
    const propDownUrl = baseURI + ProvInstallFileType.PROP;
    const dataDownUrl = baseURI + ProvInstallFileType.DATA;
    
    console.log('DownloadManager: URLs prepared', {
      javaDownUrl,
      jarDownUrl,
      propDownUrl,
      dataDownUrl
    });
    
    try {
      // 모든 파일 병렬 다운로드
      await Promise.all([
        this.downloadFile(javaDownUrl, this.globalPaths.SRV_BIN || '', propFile.jdk),
        this.downloadFile(jarDownUrl, this.globalPaths.SRV_TARGET || '', propFile.jar),
        this.downloadFile(propDownUrl, this.globalPaths.SRV_CONF || '', propFile.prop),
        this.downloadFile(dataDownUrl, this.globalPaths.SRV_DATA || '', propFile.data)
      ]);
      
      console.log('DownloadManager: All files downloaded successfully');
    } catch (error) {
      console.error('DownloadManager: Error downloading files:', error);
      throw error;
    }
  }
  
  /**
   * 단일 파일을 다운로드합니다.
   * @param url 다운로드 URL
   * @param filePath 저장할 경로
   * @param fileName 파일 이름
   * @returns Promise - 다운로드 완료 시 해결됨
   */
  private downloadFile(url: string, filePath: string, fileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`DownloadManager: Downloading ${fileName} from ${url}`);
      
      const fullPath = path.join(filePath, fileName);
      const file = fs.createWriteStream(fullPath);
      
      file.on('error', (err) => {
        console.error(`DownloadManager: Error creating file ${fullPath}:`, err);
        reject(err);
      });
      
      http.get(url, (response) => {
        if (response.statusCode !== 200) {
          const error = new Error(`Request failed with status code ${response.statusCode}`);
          file.close();
          reject(error);
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`DownloadManager: Download completed for ${fileName}`);
          
          // ZIP 파일인 경우 압축 해제
          if (fileName.endsWith('.zip')) {
            this.unzipFile(fullPath, fileName);
          }
          
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(fullPath, () => {}); // 실패한 파일 제거
        console.error(`DownloadManager: Error downloading ${fileName}:`, err);
        reject(err);
      });
    });
  }
  
  /**
   * ZIP 파일을 압축 해제합니다.
   * @param zipFilePath ZIP 파일 경로
   * @param fileName ZIP 파일 이름
   */
  private unzipFile(zipFilePath: string, fileName: string): void {
    try {
      console.log(`DownloadManager: Unzipping ${fileName}`);
      
      // JDK ZIP 파일인 경우
      if (fileName === appConfig.agent.file.name.jdk && this.globalPaths.SRV_JDK) {
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(this.globalPaths.SRV_JDK, true);
        console.log(`DownloadManager: Unzipped ${fileName} to ${this.globalPaths.SRV_JDK}`);
      }
    } catch (error) {
      console.error(`DownloadManager: Error unzipping ${fileName}:`, error);
      throw error;
    }
  }
}

export default DownloadManager;