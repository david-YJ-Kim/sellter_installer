Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "C:\Workspace\sellter\sellter_installer\sample\javaAgent\sample_run_jar_app.bat", "/c lodctr.exe /r", "", "runas", 0
