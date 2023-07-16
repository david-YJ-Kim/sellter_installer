@echo off

REM This is a comment describing the purpose of the batch file
REM You can add multiple comment lines as needed

REM unzip된 jdk path와 다운로드 받은 jar 파일 위치 설정하여 app run bat파일 생성
REM 해당 bat 파일에 app property 파일도 추가하여 사용
REM 아래 파일은 변수화 하면, %1 -jar %2  -- %1: jdk 위치., %2: jar 위치, 향후 property도 이와 같이 설정


.\java-11-openjdk-11.0.15.9-1.windows.ojdkbuild.x86_64\java-11-openjdk-11.0.15.9-1.windows.ojdkbuild.x86_64\bin\java.exe -jar .\sellter.agent-0.0.1-SNAPSHOT.jar