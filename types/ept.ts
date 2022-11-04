import {PropertyOnline, ServiceNode} from "./online";

interface MirrorLocal {
  name: string;
  description: string;
  protocol: string;
  property: PropertyOnline;
  services: ServiceNode[];
}

export {MirrorLocal};
