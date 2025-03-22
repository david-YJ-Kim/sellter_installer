import * as net from "net";

/**
 * 포트 관리자 클래스
 */
class PortManager {
  /**
   * 사용 가능한 포트를 찾습니다.
   * @param startPort 시작 포트
   * @returns Promise - 사용 가능한 포트
   */
  async findAvailablePort(startPort: string): Promise<number> {
    const port = parseInt(startPort, 10);
    return this.findNextAvailablePort(port);
  }

  /**
   * 다음으로 사용 가능한 포트를 찾습니다.
   * @param port 시작 포트
   * @returns Promise - 사용 가능한 포트
   */
  private async findNextAvailablePort(port: number): Promise<number> {
    try {
      const isAvailable = await this.isPortAvailable(port);
      if (isAvailable) {
        return port;
      }
      // 재귀적으로 다음 포트 확인
      return this.findNextAvailablePort(port + 1);
    } catch (error) {
      console.error("PortManager: Error finding available port:", error);
      throw error;
    }
  }

  /**
   * 포트가 사용 가능한지 확인합니다.
   * @param port 확인할 포트
   * @returns Promise - 포트가 사용 가능하면 true, 그렇지 않으면 false
   */
  private isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = net.createServer();

      server.once("error", () => {
        resolve(false);
      });

      server.once("listening", () => {
        server.close();
        resolve(true);
      });

      server.listen(port);
    });
  }
}

export default PortManager;
