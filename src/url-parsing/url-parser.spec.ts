import {ParsedUrl, parseUrl} from './url-parser';

describe('url parser', () => {
  it('should extract org', () => {
    const demoUrl = 'https://github.com/wix/yoshi/tree/master/packages/yoshi';
    expect(parseUrl(demoUrl).org).toBe('wix');
  });

  describe('Repo', () => {
    it('should extract repo', () => {
      const demoUrl = 'https://github.com/wix/yoshi/tree/master/packages/yoshi';
      expect(parseUrl(demoUrl).repo).toBe('yoshi');
    });

    it('should extract repo with dot in its name', () => {
      const demoUrl = 'https://github.com/wix/yoshi.js/tree/master/packages/yoshi';
      expect(parseUrl(demoUrl).repo).toBe('yoshi.js');
    });
  });

  describe('Path', () => {
    it('extract path', () => {
      const testcase1 = 'https://github.com/wix/yoshi/tree/master/packages/yoshi';
      expect(parseUrl(testcase1).path).toBe('packages/yoshi');
    });

    it('extract path with commit url', () => {
      const testcase = 'https://github.com/wix/yoshi/tree/fea76b2c139805cd6984e52a99a30bc9720d81bb/packages/eslint-config-yoshi';
      expect(parseUrl(testcase).path).toBe('packages/eslint-config-yoshi');
    });

    it('extract path with symbols', () => {
      const testcase = 'https://github.com/wix/yoshi/tree/master/packages/eslint_config@yoshi$sheker%kolshu';
      expect(parseUrl(testcase).path).toBe('packages/eslint_config@yoshi$sheker%kolshu');
    });
  });

  describe('Edge cases', () => {
    it('should handle external URL gracefully', () => {
      const demoUrl = 'https://google.com';
      const expected: ParsedUrl = {
        org: null,
        path: null,
        repo: null
      };
      expect(parseUrl(demoUrl)).toEqual(expected);
    });

    it('should handle a URL with only org', () => {
      const demoUrl = 'https://github.com/wix';
      const expected: ParsedUrl = {
        org: 'wix',
        path: null,
        repo: null
      };
      expect(parseUrl(demoUrl)).toEqual(expected);
    });

    it('should handle a URL with only org and repo', () => {
      const demoUrl = 'https://github.com/wix/yoshi';
      const expected: ParsedUrl = {
        org: 'wix',
        path: null,
        repo: 'yoshi'
      };
      expect(parseUrl(demoUrl)).toEqual(expected);
    });

    it('should handle a URL representing a file(blob) in github', () => {
      const demoUrl = 'https://github.com/angular/angular/blob/master/modules/empty.ts';
      const expected: ParsedUrl = {
        org: 'angular',
        path: 'modules',
        repo: 'angular'
      };
      expect(parseUrl(demoUrl)).toEqual(expected);
    });
  });
});