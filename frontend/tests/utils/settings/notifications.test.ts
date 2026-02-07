import { notificationsConfig } from '../../../src/static/js/utils/settings/notifications';

/**
 * Behaviors covered:
 * 1) Returns defaults when no settings provided
 * 2) Trims incoming message values and applies only when non-empty
 * 3) Ignores undefined or empty-string overrides, keeping defaults
 * 4) Allows partial overrides without affecting other keys
 * 5) Is resilient to extraneous keys and preserves typing of known keys
 */

describe('utils/settings', () => {
    describe('notifications', () => {
        test('returns defaults when no settings provided', () => {
            const cfg = notificationsConfig();
            expect(cfg).toStrictEqual({
                messages: {
                    addToLiked: 'Added to liked media',
                    removeFromLiked: 'Removed from liked media',
                    addToDisliked: 'Added to disliked media',
                    removeFromDisliked: 'Removed from disliked media',
                },
            });
        });

        test('trims incoming message values and applies only when non-empty', () => {
            const cfg = notificationsConfig({
                messages: {
                    addToLiked: '  Yay  ' as any,
                    removeFromLiked: '   ' as any,
                    addToDisliked: '\nNope',
                    removeFromDisliked: '\t OK\t',
                },
            } as any);

            expect(cfg.messages.addToLiked).toBe('Yay');
            // empty after trim -> keep default
            expect(cfg.messages.removeFromLiked).toBe('Removed from liked media');
            expect(cfg.messages.addToDisliked).toBe('Nope');
            expect(cfg.messages.removeFromDisliked).toBe('OK');
        });

        test('ignores undefined or empty-string overrides, keeping defaults', () => {
            const cfg = notificationsConfig({
                messages: {
                    addToLiked: undefined as any,
                    removeFromLiked: '',
                    addToDisliked: '   ',
                    removeFromDisliked: undefined as any,
                },
            } as any);

            expect(cfg.messages.addToLiked).toBe('Added to liked media');
            expect(cfg.messages.removeFromLiked).toBe('Removed from liked media');
            expect(cfg.messages.addToDisliked).toBe('Added to disliked media');
            expect(cfg.messages.removeFromDisliked).toBe('Removed from disliked media');
        });

        test('allows partial overrides without affecting other keys', () => {
            const cfg = notificationsConfig({
                messages: {
                    addToLiked: 'Nice!',
                },
            } as any);

            expect(cfg.messages.addToLiked).toBe('Nice!');
            expect(cfg.messages.removeFromLiked).toBe('Removed from liked media');
            expect(cfg.messages.addToDisliked).toBe('Added to disliked media');
            expect(cfg.messages.removeFromDisliked).toBe('Removed from disliked media');
        });

        test('handles extraneous keys by passing them through while keeping known defaults intact', () => {
            const cfg = notificationsConfig({
                messages: {
                    addToLiked: 'A',
                    // Inject an unknown key; current implementation passes unknown keys through
                    ...({ notARealKey: 'x' } as any),
                },
            } as any);

            expect(cfg.messages.addToLiked).toBe('A');
            // extraneous key currently copied over
            expect((cfg.messages as any).notARealKey).toBe('x');
            // sanity check known defaults remain for untouched keys
            expect(cfg.messages.removeFromLiked).toBe('Removed from liked media');
            expect(cfg.messages.addToDisliked).toBe('Added to disliked media');
            expect(cfg.messages.removeFromDisliked).toBe('Removed from disliked media');
        });
    });
});
