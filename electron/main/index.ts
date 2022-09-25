import { app, BrowserWindow, ipcMain, shell } from "electron";
import { release } from "os";
import { join } from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import init from "./init";

if (release().startsWith("6.1")) app.disableHardwareAcceleration();

if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  dist: join(__dirname, "../.."),
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Launching...",
    width: 1400,
    height: 800,
    icon: join(ROOT_PATH.public, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  if (app.isPackaged) {
    await win.loadFile(indexHtml);
    win.webContents.openDevTools();
    // win.removeMenu();
  } else {
    await win.loadURL(url);
    win.webContents.openDevTools();
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(async () => {
  try {
    const extName = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Added Extension:  ${extName}`);
  } catch (e) {
    console.error(e);
  }

  await createWindow();

  // 当渲染进程就绪时进行初始化
  ipcMain.on("_init", async (event) => {
    const initRes = await init(win!.webContents);
    if (initRes.err) {
      event.reply("_init-error", initRes.val);
    }
  });
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", async () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    await createWindow();
  }
});

// 自定义窗口控制函数
export function closeWindow() {
  app.quit();
}

export function restartWindow() {
  if (app.isPackaged) {
    app.relaunch();
  } else {
    console.log("Internal:Manually start another develop process");
  }
  closeWindow();
}

export function toggleDevTool() {
  win.webContents.openDevTools();
}
