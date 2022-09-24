import { Theme } from "./theme";
import { PropertyOnline, ServiceNode } from "./online";

export interface Config {
  ept: {
    mirror: {
      current: string | null;
      pool: Record<string, MirrorLocal>;
    };
  };
  theme: Theme;
}

interface MirrorLocal {
  name: string;
  description: string;
  protocol: string;
  property: PropertyOnline;
  services: ServiceNode[];
}
