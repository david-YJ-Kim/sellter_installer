// 앱 설정 객체
const appConfig = {
  agent: {
    server: {
      ip: 'http://localhost',
      port: 16001,
      uri: {
        download: {
          prefix: 'provision',
          getInfo: 'PROV_INSTALL_INFO_REQ',
          downReq: 'PROV_INSTALL_FILE_REQ',
        },
      },
    },
    file: {
      path: {
        base: 'Installer',
        bin: 'bin',
        data: 'data',
        conf: 'conf',
        target: 'target',
        log: 'log',
      },
      name: {
        jdk: 'jdk8.zip',
        javaHome: 'java-1.8.0-openjdk-1.8.0.332-1.b09.ojdkbuild.windows.x86_64',
        jar: 'service.jar',
        prop: 'application.yml',
        data: 'data.sqlite3',
        bat: 'run_agent.bat',
        reg: 'addStartProgram.bat',
        vbs: 'run_agent_background.vbs',
        lib: 'source.zip',
        exe: 'ServiceAgent.exe',
      },
      content: {
        bat: `{} -jar -Dserver.port={} -Dspring.config.additional-location={} -Dname={} {} {}`,
        vbs: `' WScript.Shell 객체 생성
Set WshShell = CreateObject("WScript.Shell")

' 배치 파일을 백그라운드에서 실행 (0은 창을 숨김)
WshShell.Run "{}{}{}", 0

' WScript.Shell 객체 해제
Set WshShell = Nothing`,
        reg: `@echo off
reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v "{}" /t REG_SZ /d "C:\\Windows\\System32\\WScript.exe \\"{}{}{}\\""`,
      },
    },
  },
  environment: {
    DEV: {
      server_host: "http://34.64.163.97",
      server_port: "8080",
      base_uri: "/download/"
    },
    QA: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    PRD: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql"
    }
  }
};

export default appConfig;