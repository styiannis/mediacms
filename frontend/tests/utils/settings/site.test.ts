import { siteConfig } from '../../../src/static/js/utils/settings/site';

// Tests for siteConfig following conventions in utils-settings suite
// Behaviors:
// 1) Applies defaults when no settings provided
// 2) Trims string fields: id, url, api, title, version
// 3) Handles useRoundedCorners: defaults to true unless explicitly false
// 4) Resilient to partial inputs and ignores extra properties
// 5) Does not mutate input object

describe('utils/settings', () => {
    describe('site', () => {
        test('applies defaults when no settings provided', () => {
            const cfg = siteConfig();
            expect(cfg).toStrictEqual({
                id: 'media-cms',
                url: '',
                api: '',
                title: '',
                useRoundedCorners: true,
                version: '1.0.0',
            });
        });

        test('trims string fields (id, url, api, title, version)', () => {
            const cfg = siteConfig({
                id: ' my-site ',
                url: ' https://example.com/ ',
                api: ' https://example.com/api/ ',
                title: ' Media CMS ',
                version: ' 2.3.4 ',
            } as any);

            expect(cfg.id).toBe('my-site');
            expect(cfg.url).toBe('https://example.com/');
            expect(cfg.api).toBe('https://example.com/api/');
            expect(cfg.title).toBe('Media CMS');
            expect(cfg.version).toBe('2.3.4');
        });

        test('handles useRoundedCorners: defaults to true unless explicitly false', () => {
            expect(siteConfig({}).useRoundedCorners).toBe(true);
            expect(siteConfig({ useRoundedCorners: true }).useRoundedCorners).toBe(true);
            expect(siteConfig({ useRoundedCorners: false }).useRoundedCorners).toBe(false);
            // non-boolean should still evaluate to default true because only === false toggles it off
            expect(siteConfig({ useRoundedCorners: 'no' as any }).useRoundedCorners).toBe(true);
            expect(siteConfig({ useRoundedCorners: 0 as any }).useRoundedCorners).toBe(true);
            expect(siteConfig({ useRoundedCorners: null as any }).useRoundedCorners).toBe(true);
        });

        test('is resilient to partial inputs and ignores extra properties', () => {
            const cfg = siteConfig({ id: ' x ', extra: 'y' } as any);
            expect(cfg).toMatchObject({ id: 'x' });
            expect(Object.keys(cfg).sort()).toStrictEqual(
                ['api', 'id', 'title', 'url', 'useRoundedCorners', 'version'].sort()
            );
        });

        test('does not mutate input object', () => {
            const input: any = { id: ' my-id ', useRoundedCorners: false };
            const copy = JSON.parse(JSON.stringify(input));
            siteConfig(input);
            expect(input).toStrictEqual(copy);
        });
    });
});
