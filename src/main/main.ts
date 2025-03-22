import path from "path";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";
import BizHandler from "../services/bizHandler";
import { IPC_CHANNELS } from "../shared/constants/ipcChannels";

// 앱 업데이터 클래스
class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// 메인 윈도우 레퍼런스
let mainWindow: BrowserWindow | null = null;
// 비즈니스 핸들러 인스턴스
const bizHandler = new BizHandler();

// 예제 IPC 통신 설정
ipcMain.on(IPC_CHANNELS.IPC_EXAMPLE, async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply(IPC_CHANNELS.IPC_EXAMPLE, msgTemplate("pong"));
});

// 비즈니스 에이전트 작업 IPC 통신 설정
ipcMain.on(IPC_CHANNELS.BIZ_AGENT_JOB, async (event, payload) => {
  try {
    const response = await bizHandler.handleJob(event, payload);
    console.log("Main process: BIZ_AGENT_JOB response:", response);
    event.reply(IPC_CHANNELS.BIZ_AGENT_JOB, response);
  } catch (error) {
    console.error("Main process: BIZ_AGENT_JOB error:", error);
    event.reply(IPC_CHANNELS.BIZ_AGENT_JOB, {
      success: false,
      message: `Error: ${error.message}`,
    });
  }
});

// 개발 모드 확인
const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

// 개발 도구 설치
const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

// 메인 윈도우 생성
const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // 외부 링크를 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  // 자동 업데이트 설정
  new AppUpdater();
};

// 모든 윈도우 닫힘 이벤트 처리
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 앱 준비 완료
app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      // macOS에서는 dock 아이콘 클릭 시 윈도우 재생성
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
