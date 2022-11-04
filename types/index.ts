interface Integrity {
  method: "sha256" | "blake3";
  value: string;
}

type TaskStatus = {
  state:
    | "Available"
    | "Downloading"
    | "Pending"
    | "Installing"
    | "Installed"
    | "Upgradable";
  percentage?: number; // 0-100
};

type InitErrorTypes = "Config" | "DownloadDir";

interface InitError {
  type: InitErrorTypes;
  msg: string;
}

interface KernelLocal {
  name: string;

}

interface KernelOnline {
  name: string;

}

interface VentoyLocal {
  name: string;

}

interface VentoyOnline {
  name: string;

}

export {
  Integrity,
  TaskStatus,
  InitError,
  KernelLocal,
  KernelOnline,
  VentoyLocal,
  VentoyOnline
};
