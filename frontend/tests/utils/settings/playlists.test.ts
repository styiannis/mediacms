import { playlistsConfig } from '../../../src/static/js/utils/settings/playlists';

// Unit tests for playlistsConfig. Mirrors style used in utils-settings suite.
// Behaviors covered:
// 1) Defaults to ['audio', 'video'] when no settings provided
// 2) Filters only valid types when both valid and invalid are provided
// 3) Returns default when mediaTypes is an empty array
// 4) Returns default when mediaTypes is non-array or undefined/null
// 5) Handles duplicates and preserves order among valid items
// 6) Rejects case-insensitive mismatches (e.g., 'Audio')
// 7) Does not mutate provided input object

describe('utils/settings', () => {
    describe('playlists', () => {
        test('defaults to both audio and video when no settings provided', () => {
            const cfg = playlistsConfig();
            expect(cfg.mediaTypes).toEqual(['audio', 'video']);
        });

        test('includes only valid media types when both valid and invalid are provided', () => {
            const cfg = playlistsConfig({ mediaTypes: ['audio', 'invalid', 'video', 'something'] as any });
            expect(cfg.mediaTypes).toEqual(['audio', 'video']);
        });

        test('returns default when provided mediaTypes array is empty', () => {
            const cfg = playlistsConfig({ mediaTypes: [] });
            expect(cfg.mediaTypes).toEqual(['audio', 'video']);
        });

        test('returns default when provided mediaTypes is non-array or undefined/null', () => {
            expect(playlistsConfig({} as any).mediaTypes).toEqual(['audio', 'video']);
            expect(playlistsConfig({ mediaTypes: undefined } as any).mediaTypes).toEqual(['audio', 'video']);
            expect(playlistsConfig({ mediaTypes: null as any }).mediaTypes).toEqual(['audio', 'video']);
            expect(playlistsConfig({ mediaTypes: 'audio' as any }).mediaTypes).toEqual(['audio', 'video']);
            expect(playlistsConfig({ mediaTypes: 123 as any }).mediaTypes).toEqual(['audio', 'video']);
        });

        test('handles duplicates and preserves order among valid items', () => {
            const cfg = playlistsConfig({ mediaTypes: ['video', 'audio', 'video', 'audio', 'invalid'] as any });
            // Implementation preserves order and includes duplicates; however, it later enforces default if empty only.
            // Since duplicates are allowed by implementation, expect duplicates to be preserved.
            expect(cfg.mediaTypes).toEqual(['video', 'audio', 'video', 'audio']);
        });

        test('rejects non-exact case values (e.g., \"Audio\")', () => {
            const cfg = playlistsConfig({ mediaTypes: ['Audio', 'Video'] as any });
            // None match exactly, so default should apply.
            expect(cfg.mediaTypes).toEqual(['audio', 'video']);
        });

        test('does not mutate the input object', () => {
            const input: any = { mediaTypes: ['audio', 'video', 'invalid'] };
            const copy = JSON.parse(JSON.stringify(input));
            playlistsConfig(input);
            expect(input).toEqual(copy);
        });
    });
});
