import { StringKVMap } from '../electron/class';


function getQuery(): StringKVMap<string> {
  let match = window.location.href.match(/[?&]\w+=[^?&]+/g);
  if (match == null) return {};
  let res: StringKVMap<string> = {};
  for (let text of match) {
    const s = decodeURI(text).slice(1).split('=');
    res[s[0]] = s[1];
  }
  return res;
}


export {
  getQuery

};
