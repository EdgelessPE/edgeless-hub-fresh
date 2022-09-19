import {PropertyOnline, ServiceNode} from "types/online";
import {Theme} from "types/theme";

export interface Config {
  ept: {
    mirror: {
      current: string | null,
      pool: Record<string, MirrorLocal>
    },
  }
  theme: Theme
}

interface MirrorLocal {
  name: string
  description: string
  protocol: string
  property: PropertyOnline
  services: ServiceNode[]
}
