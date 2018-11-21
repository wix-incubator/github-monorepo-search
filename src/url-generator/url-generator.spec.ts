import {ParsedUrl} from "../url-parsing/url-parser";
import {urlGenerator} from './url-generator';
describe('github search url generator', () => {
  it('should generate basic url', () => {
    const parsedUrl: ParsedUrl = {
      org: 'wix',
      path: 'config',
      repo: 'yoshi'
    };
    expect(urlGenerator(parsedUrl, 'foo')).toMatchObject({
      base: 'https://github.com/wix/yoshi/search',
      query: {
        q: 'path:config foo'
      }
    });
  });

  it('should generate global search url', () => {
    const parsedUrl: ParsedUrl = {
      org: null,
      path: null,
      repo: null
    };
    expect(urlGenerator(parsedUrl, 'foo')).toMatchObject({
      base: 'https://github.com/search',
      query: {
        q: 'foo'
      }
    });
  });

  it('should generate a url for a search criteria with spaces', () => {
    const parsedUrl: ParsedUrl = {
      org: null,
      path: null,
      repo: null
    };
    expect(urlGenerator(parsedUrl, 'foo bar')).toMatchObject({
      base: 'https://github.com/search',
      query: {
        q: 'foo bar'
      }
    });
  });

  it('should generate a url for a location url without path', () => {
    const parsedUrl: ParsedUrl = {
      org: 'wix',
      path: null,
      repo: 'yoshi'
    };
    expect(urlGenerator(parsedUrl, 'foo')).toMatchObject({
      base: 'https://github.com/wix/yoshi/search',
      query: {
        q: 'foo'
      }
    });
  });

  it('should generate a url for a location url without repo, without path', () => {
    const parsedUrl: ParsedUrl = {
      org: 'wix',
      path: null,
      repo: null
    };
    expect(urlGenerator(parsedUrl, 'foo')).toMatchObject({
      base: 'https://github.com/search',
      query: {
        q: 'org:wix foo',
        type: 'Code'
      }
    });
  });

});
