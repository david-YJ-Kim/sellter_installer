@echo off
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run" /v "SellterAgent" /t REG_SZ /d "%1 --minimize" /f
