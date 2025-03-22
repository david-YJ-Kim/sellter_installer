import * as path from "path";
import appConfig from "./config";
import { createDirectory, writeFile, formatString } from "./utils";

// 전역 경로 저장 인터페이스
interface GlobalPaths {
  SRV_HOME?: string;
  SRV_BIN?: string;
  SRV_DATA?: string;
  SRV_CONF?: string;
  SRV_TARGET?: string;
  SRV_LOG?: string;
  SRV_JDK?: string;
}

// 전역 경로 저장 객체
const globalPaths: GlobalPaths = {};

/**
 * 파일 관리자 클래스
 */
class FileManager {
  /**
   * 필요한 모든 디렉토리를 생성하고 스크립트 파일을 생성합니다.
   * @param localPath 기본 로컬 경로
   * @param version 서비스 버전
   * @param javaOpts Java 옵션
   * @param port 서비스 포트
   */
  async setupDirectories(
    localPath: string,
    version: string,
    javaOpts: string,
    port: string
  ): Promise<GlobalPaths> {
    console.log("FileManager: Setting up directories");

    try {
      // 기본 디렉토리 생성
      const basePath = this.generateBaseDirectories(localPath, version);

      // 스크립트 파일 생성
      this.createBatFile(appConfig.agent.file.name.bat, javaOpts, port);
      this.createVbsFile(
        appConfig.agent.file.name.bat,
        appConfig.agent.file.name.vbs
      );
      this.createRegAddBatFile(
        "ServiceAgent",
        appConfig.agent.file.name.vbs,
        appConfig.agent.file.name.reg
      );

      console.log(
        "FileManager: All directories and scripts created successfully"
      );

      return globalPaths;
    } catch (error) {
      console.error("FileManager: Error setting up directories:", error);
      throw error;
    }
  }

  /**
   * 기본 디렉토리 구조를 생성합니다.
   * @param localPath 기본 로컬 경로
   * @param version 서비스 버전
   * @returns 서비스 홈 경로
   */
  private generateBaseDirectories(localPath: string, version: string): string {
    console.log("FileManager: Generating base directories");

    // 기본 경로 생성
    const basePath = createDirectory(localPath, appConfig.agent.file.path.base);

    // 버전 디렉토리 생성
    const servicePath = createDirectory(basePath, version);
    globalPaths.SRV_HOME = servicePath;

    // bin 디렉토리 생성
    const binPath = createDirectory(servicePath, appConfig.agent.file.path.bin);
    globalPaths.SRV_BIN = binPath;

    // data 디렉토리 생성
    const dataPath = createDirectory(
      servicePath,
      appConfig.agent.file.path.data
    );
    globalPaths.SRV_DATA = dataPath;

    // conf 디렉토리 생성
    const confPath = createDirectory(
      servicePath,
      appConfig.agent.file.path.conf
    );
    globalPaths.SRV_CONF = confPath;

    // target 디렉토리 생성
    const targetPath = createDirectory(
      servicePath,
      appConfig.agent.file.path.target
    );
    globalPaths.SRV_TARGET = targetPath;

    // log 디렉토리 생성
    const logPath = createDirectory(servicePath, appConfig.agent.file.path.log);
    globalPaths.SRV_LOG = logPath;

    // JDK 디렉토리 생성
    const jdkPath = createDirectory(binPath, "JDK");
    globalPaths.SRV_JDK = jdkPath;

    return servicePath;
  }

  /**
   * 레지스트리 추가 배치 파일을 생성합니다.
   * @param scriptName 스크립트 이름
   * @param vbsFileName VBS 파일 이름
   * @param regAddFileName 레지스트리 추가 파일 이름
   */
  private createRegAddBatFile(
    scriptName: string,
    vbsFileName: string,
    regAddFileName: string
  ): void {
    console.log("FileManager: Creating registry add BAT file");

    if (!globalPaths.SRV_BIN) {
      throw new Error("SRV_BIN path is not defined");
    }

    const content = formatString(
      appConfig.agent.file.content.reg,
      scriptName,
      globalPaths.SRV_BIN,
      path.sep,
      vbsFileName
    );

    writeFile(globalPaths.SRV_BIN, regAddFileName, content);
  }

  /**
   * BAT 파일을 생성합니다.
   * @param batFileName BAT 파일 이름
   * @param javaOpts Java 옵션
   * @param port 서비스 포트
   */
  private createBatFile(
    batFileName: string,
    javaOpts: string,
    port: string
  ): void {
    console.log("FileManager: Creating BAT file");

    if (
      !globalPaths.SRV_BIN ||
      !globalPaths.SRV_JDK ||
      !globalPaths.SRV_CONF ||
      !globalPaths.SRV_TARGET
    ) {
      throw new Error("Required paths are not defined");
    }

    const javaExe = path.join(
      globalPaths.SRV_JDK,
      appConfig.agent.file.name.javaHome,
      "bin",
      "java.exe"
    );

    const content = formatString(
      appConfig.agent.file.content.bat,
      javaExe,
      port,
      path.join(globalPaths.SRV_CONF, "*.yml"),
      "ServiceName",
      javaOpts,
      path.join(globalPaths.SRV_TARGET, appConfig.agent.file.name.jar)
    );

    writeFile(globalPaths.SRV_BIN, batFileName, content);
  }

  /**
   * VBS 파일을 생성합니다.
   * @param batFileName BAT 파일 이름
   * @param vbsFileName VBS 파일 이름
   */
  private createVbsFile(batFileName: string, vbsFileName: string): void {
    console.log("FileManager: Creating VBS file");

    if (!globalPaths.SRV_BIN) {
      throw new Error("SRV_BIN path is not defined");
    }

    const content = formatString(
      appConfig.agent.file.content.vbs,
      globalPaths.SRV_BIN,
      path.sep,
      batFileName
    );

    writeFile(globalPaths.SRV_BIN, vbsFileName, content);
  }
}

// 기본 내보내기로 변경
export default FileManager;
