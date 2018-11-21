import {urlGenerator} from "./url-generator/url-generator";
import {parseUrl} from "./url-parsing/url-parser";

const combineQueryParams = (params: Record<string, string>) =>
  '?' + Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

chrome.omnibox.onInputEntered.addListener((value) => {
    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs.length) {
        const [selectedTab] = tabs;
        const urlParts = urlGenerator(parseUrl(selectedTab.url), value);
        const url = urlParts.base + combineQueryParams(urlParts.query);
        chrome.tabs.create({url});
      }
    });
  });