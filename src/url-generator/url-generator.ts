import {ParsedUrl} from '../url-parsing/url-parser';

const GITHUB_BASE = 'https://github.com';
const SEARCH_ENDPOINT = 'search';

export function urlGenerator(parsedUrl: ParsedUrl, searchCriteria: string) {
  // searchCriteria = searchCriteria.replace(' ', '+');
  const {org, path, repo} = parsedUrl;

  if (org === null) {
    return {
      base: `${GITHUB_BASE}/${SEARCH_ENDPOINT}`,
      query: {
        q: searchCriteria
      }
    };
  }

  if (repo === null) {
    return {
      base: `${GITHUB_BASE}/${SEARCH_ENDPOINT}`,
      query: {
        q: `org:${org} ${searchCriteria}`,
        type: `Code`
      }
    };
  }

  const query = (path ? `path:${path} ` : '') + searchCriteria;
  return {
    base: `${GITHUB_BASE}/${org}/${repo}/${SEARCH_ENDPOINT}`,
    query: {
      q: query
    }
  };
}