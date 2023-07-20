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
    springAgent: {
        server_ip: "http://localhost",
        server_port: 8887,

        server_url_download_jdk: '/download/spring/agent/jdk',
        server_url_download_jar: '/download/spring/agent/jar',
        server_url_download_properties: '/download/spring/agent/prop',

        file_name_jdk: "jdk11.zip",
        file_name_jar: "sellter_agent.jar",
        file_name_bat: "run_agent.bat",
        file_name_vbs: "run_agent_background.vbs",

        file_content_bat: `@echo off  echo "Start Agent"  start /d "{}" /b {}`,
        file_content_vbs: `Set objShell = CreateObject("Shell.Application")
  objShell.ShellExecute "{}{}{}", "/c lodctr.exe /r" , "", "runas", 0,`,

        home_dir_sellter: "sellter",
        home_dir_bin: "bin",
        home_dir_data: "data",
    },
};
