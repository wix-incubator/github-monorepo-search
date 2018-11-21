import {urlGenerator} from './url-generator/url-generator';
import {parseUrl} from './url-parsing/url-parser';

const combineQueryParams = (params: Record<string, string>) =>
  '?' + Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');


export function setup() {
  const formEl: HTMLFormElement = document.querySelector('.main-form');
  const inputEl: HTMLInputElement = formEl.elements.namedItem('searchString') as HTMLInputElement;
  
  formEl.onsubmit = (ev) => {
    ev.preventDefault();
    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs.length) {
        const [selectedTab] = tabs;
        const value = inputEl.value;
        const urlParts = urlGenerator(parseUrl(selectedTab.url), value);
        const url = urlParts.base + combineQueryParams(urlParts.query);
        chrome.tabs.create({url});
      }
    });
  };
}