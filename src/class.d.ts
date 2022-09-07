interface Hello {
  name:string,
  description:string,
  protocol:string,
  property:{
    domestic_server: boolean,
    upload_bandwidth: number,
    sync_interval: 0,
    official_maintained: boolean,
  },
  services:{
    name:string,
    path:string,
  }[],
  plugins?:{
    tree: Record<string, PluginDataOnline>,
    path: string,
  },
  iso?:FileNode,
  alpha?:{
    wim:FileNode,
    cover:{
      lower_than:string,
      url:string,
    }
  },
  ventoy?:{
    windows:FileNode,
    plugin:string,
  },
  hub?:{
    latest:{
      version:string,
      page:string,
    },
    update:{
      allow_normal_since:string,
      force_update_until:string,
      wide_gaps:string[]
    },
    notices:{
      id:string,
      channel:string,
      level:string,
      message:string,
      description:string,
      close_text:string,
      lower_than:string,
      repeat_after:string,
    }[],
    packages: {
      update: string,
      extended_update: string,
      full: string,
    }
  }
}

interface FileNode {
  version: string,
  file_name: string,
  url: string,
}

interface PluginDataOnline {
  name: string,
  size: number,
  timestamp: number,
  hash: string,
  url: string,
}

interface PluginDataLocal {
  name: string,
  size: number,
  timestamp: number,
  hash?: string,
  path: string,
  attr?: string[] //插件包属性，例如对于被禁用的 LocalBoost 插件包 *.7zfl 其值为 ["f","l"]
}

interface KernelOnline {
  name: string,
  size: number,
  timestamp: number,
  hash: string,
  url: string,
}

interface KernelLocal {
  name: string,
  size: number,
  timestamp: number,
  hash?: string,
  path: string,
}

interface VentoyOnline {
  name: string,
  size: number,
  timestamp: number,
  hash: string,
  url: string,
}

interface VentoyLocal {
  version: string
  secureBoot: boolean
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
  Hello,
  TaskStatus,
  PluginDataOnline,
  PluginDataLocal,
  PluginParsedFullName,
  KernelOnline,
  KernelLocal,
  KernelParsedFullName,
  VentoyOnline,
  VentoyLocal,
  VentoyParsedFullName
}
