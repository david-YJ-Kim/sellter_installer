import subprocess

batch_file_path = r'C:\Workspace\sellter\sellter_installer\sample\javaAgent\sample_run_jar_app.bat'
command = f'cmd.exe /c start "{batch_file_path}"'

try:
    # reg.exe 명령 실행
    reg_command = ['reg.exe', 'add', 'HKCU\Software\Microsoft\Windows\CurrentVersion\Run', '/v', 'MyStartup', '/t', 'REG_SZ', '/d', command, '/f']
    subprocess.run(reg_command, check=True)

    print("배치 파일이 성공적으로 등록되었습니다.")
except subprocess.CalledProcessError as e:
    print(f"등록 중에 오류가 발생했습니다. 오류 코드: {e.returncode}")
