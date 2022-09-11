interface EptFileNode {
  name: string;
  size: string;
  timestamp: string;
  hash: string; //SHA256
}

interface EptResponse {
  name: string;
  description: string;
  native_server: boolean;
  upload_bandwidth: number;
  protocol: string;
  root: string;
  sync_interval: number; //-1代表手动同步,0代表为主站或即时同步
  official_maintained: boolean;
  services: string[];

  tree: {
    [category: string]: EptFileNode;
  };
}

interface HubResponse {
  latest: {
    version: string;
    page: string;
  };
  update: {
    allow_normal_since: string;
    force_update_until: string;
    wide_gaps: string[];
  };
  notice: {
    id: string;
    level: "info" | "warning" | "error";
    message: string;
    description: string;
    close_text: string;
    lower_than: string;
    repeat_after: number;
  }[];
  packages: {
    update: string;
    extended_update: string;
    full: string;
  };
}

interface EdgelessResponse {
  iso: {
    version: string;
    file_name: string;
    url: string;
  };
  ventoy: {
    version: string;
    file_name: string;
    url: string;
    plugin_url: string;
  };
}

interface AlphaResponse {
  wim: {
    version: string;
    file_name: string;
    url: string;
  };
  cover: {
    lower_than: string;
    url: string;
  };
}

export { EptResponse, HubResponse, EdgelessResponse, AlphaResponse };
