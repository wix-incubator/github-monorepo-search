import {doSearch} from './common';

chrome.omnibox.onInputEntered.addListener((value) => {
  doSearch(value);
});