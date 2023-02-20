interface PluginParsedFullName {
  name: string;
  version: string;
  author: string;
  isBot: boolean;
  ext: string;
}

interface KernelParsedFullName {
  version: string;
  channel: "Beta" | "Alpha";
  ext: "iso" | "wim";
}

interface VentoyParsedFullName {
  version: string;
  platform: "Windows" | "Linux";
}

export { PluginParsedFullName, KernelParsedFullName, VentoyParsedFullName };
