import { optionsEmbeddedConfig } from '../../../src/static/js/utils/settings/optionsEmbedded';

// Behaviors:
// 1) Returns defaults when settings is undefined
// 2) Returns defaults when settings.initialDimensions is undefined
// 3) Applies valid numeric width and height from initialDimensions
// 4) Ignores non-numeric/NaN width and height, preserving defaults
// 5) Ignores provided widthUnit/heightUnit values as they are not used
// 6) Does not mutate the provided settings object

describe('utils/settings', () => {
    describe('optionsEmbedded', () => {
        test('returns default dimensions when settings is undefined', () => {
            const cfg = optionsEmbeddedConfig(undefined as any);
            expect(cfg.video.dimensions).toStrictEqual({ width: 560, widthUnit: 'px', height: 315, heightUnit: 'px' });
        });

        test('returns default dimensions when settings.initialDimensions is undefined', () => {
            const cfg = optionsEmbeddedConfig({} as any);
            expect(cfg.video.dimensions).toStrictEqual({ width: 560, widthUnit: 'px', height: 315, heightUnit: 'px' });
        });

        test('applies valid numeric width and height from initialDimensions', () => {
            const cfg = optionsEmbeddedConfig({ initialDimensions: { width: 640, height: 360 } } as any);
            expect(cfg.video.dimensions.width).toBe(640);
            expect(cfg.video.dimensions.height).toBe(360);
            expect(cfg.video.dimensions.widthUnit).toBe('px');
            expect(cfg.video.dimensions.heightUnit).toBe('px');
        });

        test('ignores NaN and non-numeric width/height and keeps defaults', () => {
            const cfg1 = optionsEmbeddedConfig({ initialDimensions: { width: NaN, height: NaN } } as any);
            expect(cfg1.video.dimensions).toStrictEqual({ width: 560, widthUnit: 'px', height: 315, heightUnit: 'px' });

            const cfg2 = optionsEmbeddedConfig({
                initialDimensions: { width: '640' as any, height: '360' as any },
            } as any);
            expect(cfg2.video.dimensions).toStrictEqual({ width: 560, widthUnit: 'px', height: 315, heightUnit: 'px' });
        });

        test('ignores provided widthUnit/heightUnit as they are not used', () => {
            const cfg = optionsEmbeddedConfig({
                initialDimensions: {
                    width: 800,
                    height: 450,
                    widthUnit: 'percent' as any,
                    heightUnit: 'percent' as any,
                },
            } as any);
            // units should remain default 'px'
            expect(cfg.video.dimensions.width).toBe(800);
            expect(cfg.video.dimensions.height).toBe(450);
            expect(cfg.video.dimensions.widthUnit).toBe('px');
            expect(cfg.video.dimensions.heightUnit).toBe('px');
        });

        test('does not mutate the provided settings object', () => {
            const input: any = {
                initialDimensions: { width: 700, height: 400, widthUnit: 'percent', heightUnit: 'percent' },
            };
            const copy = JSON.parse(JSON.stringify(input));
            optionsEmbeddedConfig(input);
            expect(input).toStrictEqual(copy);
        });
    });
});
