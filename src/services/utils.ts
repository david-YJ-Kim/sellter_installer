import * as fs from 'fs';
import * as path from 'path';

/**
 * 디렉토리를 생성합니다. 이미 존재하는 경우 생성하지 않습니다.
 * @param basePath 기본 경로
 * @param directoryName 생성할 디렉토리 이름
 * @returns 생성된 디렉토리의 전체 경로
 */
export const createDirectory = (basePath: string, directoryName: string): string => {
  const targetDirectory = path.join(basePath, directoryName);

  if (!fs.existsSync(targetDirectory)) {
    try {
      fs.mkdirSync(targetDirectory, { recursive: true });
      console.log(`Created directory: ${targetDirectory}`);
    } catch (error) {
      console.error(`Failed to create directory ${targetDirectory}:`, error);
      throw error;
    }
  } else {
    console.log(`Directory already exists: ${targetDirectory}`);
  }
  
  return targetDirectory;
};

/**
 * 파일을 지정된 경로에 작성합니다.
 * @param dirPath 디렉토리 경로
 * @param fileName 파일 이름
 * @param content 파일 내용
 */
export const writeFile = (dirPath: string, fileName: string, content: string): void => {
  const filePath = path.join(dirPath, fileName);
  
  try {
    fs.writeFileSync(filePath, content);
    console.log(`File written successfully: ${filePath}`);
  } catch (error) {
    console.error(`Failed to write file ${filePath}:`, error);
    throw error;
  }
};

/**
 * 문자열 템플릿에 인자를 삽입합니다.
 * @param template 템플릿 문자열 ({}로 대체 위치 표시)
 * @param args 삽입할 인자들
 * @returns 포맷된 문자열
 */
export const formatString = (template: string, ...args: any[]): string => {
  let result = template;
  for (const arg of args) {
    result = result.replace('{}', arg);
  }
  return result;
};

/**
 * 지정된 포트가 사용 가능한지 확인합니다.
 * @param port 확인할 포트
 * @returns 포트가 사용 가능하면 true, 아니면 false
 */
export const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.once('error', () => {
      resolve(false);
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
};

/**
 * 사용 가능한 포트를 찾습니다.
 * @param startPort 시작 포트
 * @returns 사용 가능한 포트
 */
export const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  
  while (!(await isPortAvailable(port))) {
    port++;
  }
  
  return port;
};