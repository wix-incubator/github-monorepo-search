import {parseUrl} from './url-parser';

describe('url parser', () => {
  it('should extract org', () => {
    const demoUrl = 'https://github.com/wix-platform/wix-node-platform/tree/master/config/wix-config'
    expect(parseUrl(demoUrl).org).toBe('wix-platform');
  });

  it('should extract repo', () => {
    const demoUrl = 'https://github.com/wix-platform/wix-node-platform/tree/master/config/wix-config'
    expect(parseUrl(demoUrl).repo).toBe('wix-node-platform');
  });
});