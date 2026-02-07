import { mediaConfig } from '../../../src/static/js/utils/settings/media';

// Behaviors under test:
// 1) Defaults to displaying author, views, and publish date when not hidden
// 2) Respects hide flags for author, views, and date from features.mediaItem
// 3) Returns empty share options when shareOptions not provided
// 4) Filters share options to only valid ones (embed, email) and trims whitespace
// 5) Ignores falsy and invalid share options entries

describe('utils/settings', () => {
    describe('media', () => {
        test('defaults display flags to true when not hidden', () => {
            const cfg = mediaConfig();
            expect(cfg.item.displayAuthor).toBe(true);
            expect(cfg.item.displayViews).toBe(true);
            expect(cfg.item.displayPublishDate).toBe(true);
            expect(cfg.share.options).toEqual([]);
        });

        test('respects hide flags for author, views and date', () => {
            const cfg = mediaConfig({ hideAuthor: true, hideViews: true, hideDate: true });
            expect(cfg.item.displayAuthor).toBe(false);
            expect(cfg.item.displayViews).toBe(false);
            expect(cfg.item.displayPublishDate).toBe(false);
        });

        test('returns empty share options when not provided', () => {
            const cfg = mediaConfig({ hideAuthor: false }, undefined);
            expect(cfg.share.options).toEqual([]);
        });

        test('filters share options to valid ones and trims whitespace', () => {
            const cfg = mediaConfig(undefined, [' embed ', 'email', '  email  '] as unknown as Array<
                'embed' | 'email' | undefined
            >);
            expect(cfg.share.options).toEqual(['embed', 'email', 'email']);
        });

        test('ignores falsy and invalid share options', () => {
            const cfg = mediaConfig(undefined, [
                undefined as any,
                '' as any,
                '  ' as any,
                'invalid' as any,
                'share' as any,
                'EMBED' as any,
            ] as unknown as Array<'embed' | 'email' | undefined>);
            expect(cfg.share.options).toEqual([]);
        });
    });
});
