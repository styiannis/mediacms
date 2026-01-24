import { themeConfig } from '../../../src/static/js/utils/settings/theme';

// Behaviors to test:
// 1) Applies defaults when no inputs provided
// 2) Sets dark mode only when theme.mode is exactly 'dark' after trim
// 3) Switch config: enabled only toggles off when explicitly false; position set to 'sidebar' only when exactly 'sidebar' after trim
// 4) Trims and maps logo URLs for both light and dark modes; ignores missing fields
// 5) Does not mutate input objects

describe('utils/settings', () => {
    describe('theme', () => {
        test('applies defaults when no inputs provided', () => {
            const cfg = themeConfig();
            expect(cfg).toStrictEqual({
                mode: 'light',
                switch: { enabled: true, position: 'header' },
                logo: { lightMode: { img: '', svg: '' }, darkMode: { img: '', svg: '' } },
            });
        });

        test("sets dark mode only when theme.mode is exactly 'dark' after trim", () => {
            expect(themeConfig({ mode: 'dark' } as any).mode).toBe('dark');
            expect(themeConfig({ mode: ' dark ' } as any).mode).toBe('dark');
            expect(themeConfig({ mode: 'Dark' } as any).mode).toBe('light');
            expect(themeConfig({ mode: 'light' } as any).mode).toBe('light');
            expect(themeConfig({ mode: '  ' } as any).mode).toBe('light');
        });

        test('switch config: enabled only toggles off when explicitly false; position set to sidebar only when exactly sidebar after trim', () => {
            expect(themeConfig({ switch: { enabled: false } } as any).switch.enabled).toBe(false);
            expect(themeConfig({ switch: { enabled: true } } as any).switch.enabled).toBe(true);
            expect(themeConfig({ switch: { enabled: undefined } } as any).switch.enabled).toBe(true);

            expect(themeConfig({ switch: { position: 'sidebar' } } as any).switch.position).toBe('sidebar');
            expect(themeConfig({ switch: { position: ' sidebar ' } } as any).switch.position).toBe('sidebar');
            expect(themeConfig({ switch: { position: 'header' } } as any).switch.position).toBe('header');
            expect(themeConfig({ switch: { position: 'foot' } } as any).switch.position).toBe('header');
        });

        test('trims and maps logo URLs for both light and dark modes; ignores missing fields', () => {
            const cfg = themeConfig(undefined, {
                lightMode: { img: ' /img/light.png ', svg: ' /img/light.svg ' },
                darkMode: { img: ' /img/dark.png ', svg: ' /img/dark.svg ' },
            } as any);

            expect(cfg.logo.lightMode.img).toBe('/img/light.png');
            expect(cfg.logo.lightMode.svg).toBe('/img/light.svg');
            expect(cfg.logo.darkMode.img).toBe('/img/dark.png');
            expect(cfg.logo.darkMode.svg).toBe('/img/dark.svg');

            const partial = themeConfig(undefined, { lightMode: { img: ' /only-light.png ' } } as any);
            expect(partial.logo.lightMode.img).toBe('/only-light.png');
            expect(partial.logo.lightMode.svg).toBe('');
            expect(partial.logo.darkMode.img).toBe('');
            expect(partial.logo.darkMode.svg).toBe('');
        });

        test('does not mutate input objects', () => {
            const themeIn: any = { mode: ' dark ', switch: { enabled: false, position: ' sidebar ' } };
            const logoIn: any = { lightMode: { img: ' x ', svg: ' y ' }, darkMode: { img: ' z ', svg: ' w ' } };
            const themeCopy = JSON.parse(JSON.stringify(themeIn));
            const logoCopy = JSON.parse(JSON.stringify(logoIn));

            themeConfig(themeIn, logoIn);

            expect(themeIn).toStrictEqual(themeCopy);
            expect(logoIn).toStrictEqual(logoCopy);
        });
    });
});
