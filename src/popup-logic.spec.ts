import fs from 'fs';
import path from 'path';
import {setup} from './popup-logic';

describe.only('Popup', () => {
  let url = null;
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve('src', 'assets', 'popup.html'), 'utf-8');
    document.getElementsByTagName('html')[0].innerHTML = html;
    (global as any).chrome = {
      tabs: {
        query: (_, cb) => cb([{url}]),
        create: jest.fn(),
      }
    };
    setup();
  });
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  const expectCase = ({currentUrl, searchString = 'foo'}) => ({
    toRedirect(expectedUrl: string) {
      url = currentUrl;
      const input: HTMLInputElement = document.querySelector('input[name="searchString"]');
      const form: HTMLFormElement = document.querySelector('form');
      input.value = searchString;
      const submitEvent = new Event('submit');
      form.dispatchEvent(submitEvent);
      expect(chrome.tabs.create).toHaveBeenCalledWith({url: expectedUrl});
    }
  });

  it('Peroform a search, on a specific org, repo, path and criteria', () => {
    const currentUrl = 'https://github.com/angular/angular.js/tree/master/docs';
    const expectedUrl = 'https://github.com/angular/angular.js/search?q=path%3Adocs%20foo';

    expectCase({currentUrl}).toRedirect(expectedUrl);
  });

  it('Should perform a global github search when active tab is not on github', () => {
    const currentUrl = 'https://google.com';
    const expectedUrl = 'https://github.com/search?q=foo';

    expectCase({currentUrl}).toRedirect(expectedUrl);
  });
});