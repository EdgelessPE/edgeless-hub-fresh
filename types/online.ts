import {Integrity} from "./index";

interface FileNodePackageOnline {
  name: string;
  size: number;
  timestamp: number;
  integrity?: Integrity;
}

interface FileNodeOnline {
  name: string;
  version: string;
  url: string;
  size: number;
  timestamp?: number;
  integrity?: Integrity;
}

interface PluginsOnline {
  tree: Record<string, FileNodePackageOnline[]>;
  path: string;
}

interface VentoyOnline {
  windows: FileNodeOnline;
  linux: FileNodeOnline;
  plugin: FileNodeOnline;
}

interface HubOnline {
  latest: {
    version: string;
    page: string;
  };
  update: {
    allow_normal_since: string;
    force_update_until: string;
    wide_gaps: string[];
  };
  notices: {
    id: string;
    channel: string;
    level: string;
    message: string;
    description: string;
    close_text: string;
    lower_than: string;
    repeat_after: number;
  }[];
  packages: {
    update: FileNodeOnline;
    extended_update: FileNodeOnline;
    full: FileNodeOnline;
  };
}

interface ServiceNode {
  name: string;
  path: string;
}

interface PropertyOnline {
  domestic_server: boolean;
  upload_bandwidth: number;
  sync_interval: number;
  official_maintained: boolean;
}

export interface HelloResponse {
  name: string;
  description: string;
  root: string;
  protocol: string;
  property: PropertyOnline;
  services: ServiceNode[];
  plugins?: PluginsOnline;
  kernel?: FileNodeOnline;
  ventoy?: VentoyOnline;
  hub?: HubOnline;
}

export interface AlphaResponse {
  kernel_wim: FileNodeOnline | null;
  cover: {
    lower_than: string;
    file: FileNodeOnline;
  } | null;
}

export {
  ServiceNode,
  FileNodePackageOnline,
  FileNodeOnline,
  PropertyOnline,
  PluginsOnline,
  VentoyOnline,
  HubOnline,
};
