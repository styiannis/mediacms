import { sidebarConfig } from '../../../src/static/js/utils/settings/sidebar';

// Tests for sidebarConfig following conventions in utils-settings suite
// Behaviors:
// 1) Defaults to all links visible when no settings are provided
// 2) Hides only those explicitly set to true
// 3) Treats non-true values (false/undefined/null/other types) as false
// 4) Is resilient to partial inputs and extra properties
// 5) Is pure (does not mutate inputs)

describe('utils/settings', () => {
    describe('sidebar', () => {
        test('defaults to all links visible when no settings provided', () => {
            const cfg = sidebarConfig();
            expect(cfg).toStrictEqual({ hideHomeLink: false, hideTagsLink: false, hideCategoriesLink: false });
        });

        test('hides only those explicitly set to true', () => {
            const cfg1 = sidebarConfig({ hideHomeLink: true });
            expect(cfg1).toStrictEqual({ hideHomeLink: true, hideTagsLink: false, hideCategoriesLink: false });

            const cfg2 = sidebarConfig({ hideTagsLink: true });
            expect(cfg2).toStrictEqual({ hideHomeLink: false, hideTagsLink: true, hideCategoriesLink: false });

            const cfg3 = sidebarConfig({ hideCategoriesLink: true });
            expect(cfg3).toStrictEqual({ hideHomeLink: false, hideTagsLink: false, hideCategoriesLink: true });

            const cfgAll = sidebarConfig({ hideHomeLink: true, hideTagsLink: true, hideCategoriesLink: true });
            expect(cfgAll).toStrictEqual({ hideHomeLink: true, hideTagsLink: true, hideCategoriesLink: true });
        });

        test('treats non-true values as false', () => {
            // false
            expect(sidebarConfig({ hideHomeLink: false }).hideHomeLink).toBe(false);
            // undefined
            expect(sidebarConfig({}).hideHomeLink).toBe(false);
            // null
            expect(sidebarConfig({ hideTagsLink: null as any }).hideTagsLink).toBe(false);
            // other types
            expect(sidebarConfig({ hideCategoriesLink: 'yes' as any }).hideCategoriesLink).toBe(false);
            expect(sidebarConfig({ hideCategoriesLink: 1 as any }).hideCategoriesLink).toBe(false);
        });

        test('is resilient to partial inputs and ignores extra properties', () => {
            const cfg = sidebarConfig({ hideTagsLink: true, extra: 'prop' } as any);
            expect(cfg).toStrictEqual({ hideHomeLink: false, hideTagsLink: true, hideCategoriesLink: false });
        });

        test('does not mutate input object', () => {
            const input: any = { hideHomeLink: true };
            const copy = JSON.parse(JSON.stringify(input));
            sidebarConfig(input);
            expect(input).toStrictEqual(copy);
        });
    });
});
