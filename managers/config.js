module.exports = {
    dev: {
        server_ip: "http://localhost",
        server_port: 8887,
        agent_lib_file_name: "source.zip",
        agent_exe_file_name: "SellterAgent.exe",
        agent_bat_file_name: "sellter_agent_start.bat",
        agent_bat_file_content: `@echo off  echo "Start Agent"  start /d "{}" /b {}`,
        agent_vbs_file_name: "run_background.vbs",
        agent_vbs_file_content: `Set objShell = CreateObject("Shell.Application")
  objShell.ShellExecute "{}{}{}", "/c lodctr.exe /r" , "", "runas", 0,`,
        sellter_home_dir: "Sellter",
        sellter_bin_dir: "bin",
        sellter_data_dir: "data",
    },
};
