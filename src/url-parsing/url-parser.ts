// https:// github.com/wix-platform/wix-node-platform/tree/fea76b2c139805cd6984e52a99a30bc9720d81bb/bootstrap-plugins/grpc/wix-bootstrap-grpc
// https:// github.com/wix-platform/wix-node-platform/tree/master/config/wix-config
interface ParsedUrl {
  org: string;
  repo: string;
}
// https://github.com/wix-platform/wix-node-platform/tree/master/config/wix-config
const regex = /https:\/\/github.com\/([\w-]*)\/([\w-]*)\/.*/
export const parseUrl = (url: string): ParsedUrl => { 
  const match = regex.exec(url);
  return {
    org: match[1],
    repo: match[2]
  }
}