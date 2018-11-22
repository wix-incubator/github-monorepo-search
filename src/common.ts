import {urlGenerator} from './url-generator/url-generator';
import {parseUrl} from './url-parsing/url-parser';

const combineQueryParams = (params: Record<string, string>) =>
  '?' + Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');


export const doSearch = (searchString: string) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length) {
      const [selectedTab] = tabs;
      const urlParts = urlGenerator(parseUrl(selectedTab.url), searchString);
      const url = urlParts.base + combineQueryParams(urlParts.query);
      chrome.tabs.create({url});
    }
  });
};
