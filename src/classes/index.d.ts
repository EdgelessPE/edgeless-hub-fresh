interface Integrity {
  method: "sha256" | "blake3"
  value: string
}

interface PluginParsedFullName {
  name: string,
  version: string,
  author: string,
  isBot: boolean,
  ext: string
}

interface KernelParsedFullName {
  version: string
  channel: "Beta" | "Alpha"
  ext: "iso" | "wim"
}

interface VentoyParsedFullName {
  version: string
  platform: "Windows" | "Linux"
}

type TaskStatus = {
  state: "Available" | "Downloading" | "Pending" | "Installing" | "Installed" | "Upgradable",
  percentage?: number //0-100
}

export {
  Integrity,
  PluginParsedFullName,
  KernelParsedFullName,
  VentoyParsedFullName,
  TaskStatus,
}
