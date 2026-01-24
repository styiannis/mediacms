import { optionsPagesConfig } from '../../../src/static/js/utils/settings/optionsPages';

// Behaviors:
// 1) Uses VALID_PAGES titles as defaults for home sections when provided
// 2) Trims custom home section titles from input
// 3) Sets search.advancedFilters true only when explicitly true
// 4) Configures media options: categoriesWithTitle, htmlInDescription, displayViews logic, and related.initialSize default 10
// 5) Accepts valid numeric media.related.initialSize and ignores NaN/non-numeric
// 6) Configures profile options: htmlInDescription, includeHistory, includeLikedMedia true only when explicitly true
// 7) Does not mutate input objects

describe('utils/settings', () => {
    describe('optionsPages', () => {
        test('uses VALID_PAGES titles as defaults for home sections when provided', () => {
            const cfg = optionsPagesConfig(undefined, undefined, undefined, undefined, {
                latest: { title: 'Recent' },
                featured: { title: 'Spotlight' },
                recommended: { title: 'You may like' },
            } as any);

            expect(cfg.home.sections.latest.title).toBe('Recent');
            expect(cfg.home.sections.featured.title).toBe('Spotlight');
            expect(cfg.home.sections.recommended.title).toBe('You may like');
        });

        test('trims custom home section titles from input', () => {
            const cfg = optionsPagesConfig({
                sections: {
                    latest: { title: '  LATEST  ' },
                    featured: { title: '\nFeatured  ' },
                    recommended: { title: '  Recommended' },
                },
            } as any);

            expect(cfg.home.sections.latest.title).toBe('LATEST');
            expect(cfg.home.sections.featured.title).toBe('Featured');
            expect(cfg.home.sections.recommended.title).toBe('Recommended');
        });

        test('sets search.advancedFilters true only when explicitly true', () => {
            const def = optionsPagesConfig();
            expect(def.search.advancedFilters).toBe(false);

            const falsy = optionsPagesConfig(undefined, { advancedFilters: false } as any);
            expect(falsy.search.advancedFilters).toBe(false);

            const truthy = optionsPagesConfig(undefined, { advancedFilters: true } as any);
            expect(truthy.search.advancedFilters).toBe(true);
        });

        test('configures media options with correct defaults and overrides', () => {
            const def = optionsPagesConfig();
            expect(def.media.categoriesWithTitle).toBe(false);
            expect(def.media.htmlInDescription).toBe(false);
            expect(def.media.displayViews).toBe(true);
            expect(def.media.related.initialSize).toBe(10);

            const override = optionsPagesConfig(undefined, undefined, {
                categoriesWithTitle: true,
                htmlInDescription: true,
                hideViews: true,
                related: { initialSize: 25 },
            } as any);

            expect(override.media.categoriesWithTitle).toBe(true);
            expect(override.media.htmlInDescription).toBe(true);
            expect(override.media.displayViews).toBe(false);
            expect(override.media.related.initialSize).toBe(25);
        });

        test('ignores NaN and non-numeric media.related.initialSize and keeps default 10', () => {
            const cfg1 = optionsPagesConfig(undefined, undefined, { related: { initialSize: NaN } } as any);
            expect(cfg1.media.related.initialSize).toBe(10);

            const cfg2 = optionsPagesConfig(undefined, undefined, { related: { initialSize: '12' as any } } as any);
            expect(cfg2.media.related.initialSize).toBe(10);
        });

        test('profile settings true only when explicitly true', () => {
            const def = optionsPagesConfig();
            expect(def.profile.htmlInDescription).toBe(false);
            expect(def.profile.includeHistory).toBe(false);
            expect(def.profile.includeLikedMedia).toBe(false);

            const truthy = optionsPagesConfig(undefined, undefined, undefined, {
                htmlInDescription: true,
                includeHistory: true,
                includeLikedMedia: true,
            } as any);
            expect(truthy.profile.htmlInDescription).toBe(true);
            expect(truthy.profile.includeHistory).toBe(true);
            expect(truthy.profile.includeLikedMedia).toBe(true);
        });

        test('does not mutate provided input objects', () => {
            const home: any = { sections: { latest: { title: ' A ' } } };
            const search: any = { advancedFilters: true };
            const media: any = { hideViews: true, related: { initialSize: 5 } };
            const profile: any = { includeHistory: true };
            const validPages: any = { latest: { title: 'L' }, featured: { title: 'F' }, recommended: { title: 'R' } };

            const homeCopy = JSON.parse(JSON.stringify(home));
            const searchCopy = JSON.parse(JSON.stringify(search));
            const mediaCopy = JSON.parse(JSON.stringify(media));
            const profileCopy = JSON.parse(JSON.stringify(profile));
            const validPagesCopy = JSON.parse(JSON.stringify(validPages));

            optionsPagesConfig(home, search, media, profile, validPages);

            expect(home).toStrictEqual(homeCopy);
            expect(search).toStrictEqual(searchCopy);
            expect(media).toStrictEqual(mediaCopy);
            expect(profile).toStrictEqual(profileCopy);
            expect(validPages).toStrictEqual(validPagesCopy);
        });
    });
});
