export interface ParsedUrl {
  org: string;
  repo: string;
  path: string;
}

const regex = /https:\/\/github\.com\/([\w-]*)\/?([\w-\.]*)?(?:\/(tree|blob)\/\w*\/)?(.*)?/;

export const parseUrl = (url: string): ParsedUrl => {
  const match = regex.exec(url) || [];
  const path = match[3] === 'blob' ? (match[4] as string).split('/').slice(0, -1).join('/') : match[4];
  return {
    org: match[1] || null,
    repo: match[2] || null,
    path: path || null,
  };
};