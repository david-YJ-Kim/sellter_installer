import { eventNames } from 'process';

const apPropertyObject = {
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
        base: 'stl',
        bin: 'bin',
        data: 'data',
        conf: 'conf',
        target: 'target',
        log: 'log',
      },
      name: {
        jdk: 'jdk11.zip',
        jar: 'sellter_agent.jar',
        bat: 'run_agent.bat',
        reg: 'addStartProgream.bat',
        vbs: 'run_agent_background.vbs',
        lib: 'source.zip',
        exe: 'SellterAgent.exe',
      },
      content: {
        bat: `@echo off
REM 서비스 이름 설정
set SERVICE_NAME={}

REM JAVA 실행 파일 경로 설정 (Java Bin 까지)
set JAVA_EXE={}

REM JAR 파일 경로 설정
set JAR_PATH={}

REM 로그 파일 저장 경로 설정
set LOG_PATH={}

REM Java 옵션 설정 (필요 시 추가)
set JAVA_OPTS={}

REM 서비스 Property 파일 선택
set SRV_PROP={}

echo Starting %SERVICE_NAME%...

REM JAR 파일 실행
%JAVA_EXE%java.exe %JAVA_OPTS% -jar %JAR_PATH%

echo %SERVICE_NAME% started successfully.
pause`,
        vbs: `' WScript.Shell 객체 생성
Set WshShell = CreateObject("WScript.Shell")

' 배치 파일을 백그라운드에서 실행 (0은 창을 숨김)
WshShell.Run "{}{}{}", 0

' WScript.Shell 객체 해제
Set WshShell = Nothing`,
        reg: `@echo off
reg add HKCU\Software\Microsoft\Windows\CurrentVersion\Run /v "{}" /t REG_SZ /d "C:\Windows\System32\WScript.exe \"{}{}{}\" --minimize" /f`,
      },
    },
  },
};

module.exports = apPropertyObject;
