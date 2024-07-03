@echo off
reg add HKCU\Software\Microsoft\Windows\CurrentVersion\Run /v "SampleScript" /t REG_SZ /d "C:\Windows\System32\WScript.exe \"C:\Workspace\sellter\sellter_installer\sample\javaAgent\sample_run_jar_app.vbs\" --minimize" /f
