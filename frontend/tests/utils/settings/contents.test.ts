import { contentsConfig } from '../../../src/static/js/utils/settings/contents';

// Behaviors to test:
// 1) Returns trimmed strings for header.right and header.onLogoRight, defaults to '' when missing
// 2) sidebar: ignores falsy/invalid navMenu/mainMenuExtra items; trims and accepts only items with text, link, icon
// 3) sidebar: preserves optional className trimmed when present, empty string when absent
// 4) sidebar: trims belowNavMenu, belowThemeSwitcher, footer or defaults to '' when missing
// 5) uploader: trims belowUploadArea and postUploadMessage or defaults to '' when missing

describe('utils/settings', () => {
    describe('contents', () => {
        test('header strings are trimmed and default to empty', () => {
            const cfg = contentsConfig({ header: { right: '  R  ', onLogoRight: '  OLR  ' } } as any);
            expect(cfg.header.right).toBe('R');
            expect(cfg.header.onLogoRight).toBe('OLR');

            const cfg2 = contentsConfig({ header: {} } as any);
            expect(cfg2.header.right).toBe('');
            expect(cfg2.header.onLogoRight).toBe('');
        });

        test('sidebar menu items require text, link, icon and get trimmed', () => {
            const cfg = contentsConfig({
                sidebar: {
                    mainMenuExtraItems: [
                        { text: ' A ', link: ' /a ', icon: ' i-a ', className: '  cls  ' },
                        { text: 'no-link', icon: 'i' },
                        { link: '/missing-text', icon: 'i' },
                        { text: 'no-icon', link: '/x' },
                        null as any,
                    ],
                    navMenuItems: [
                        { text: ' B ', link: ' /b ', icon: ' i-b ' },
                        { text: ' ', link: '/bad', icon: 'i' },
                        undefined as any,
                    ],
                },
            } as any);

            expect(cfg.sidebar.mainMenuExtra.items).toEqual([{ text: 'A', link: '/a', icon: 'i-a', className: 'cls' }]);

            expect(cfg.sidebar.navMenu.items).toEqual([{ text: 'B', link: '/b', icon: 'i-b', className: '' }]);
        });

        test('sidebar strings are trimmed or default to empty', () => {
            const cfg = contentsConfig({
                sidebar: {
                    belowNavMenu: '  X  ',
                    belowThemeSwitcher: '  Y  ',
                    footer: '  Z  ',
                },
            } as any);

            expect(cfg.sidebar.belowNavMenu).toBe('X');
            expect(cfg.sidebar.belowThemeSwitcher).toBe('Y');
            expect(cfg.sidebar.footer).toBe('Z');

            const cfg2 = contentsConfig({ sidebar: {} } as any);
            expect(cfg2.sidebar.belowNavMenu).toBe('');
            expect(cfg2.sidebar.belowThemeSwitcher).toBe('');
            expect(cfg2.sidebar.footer).toBe('');
        });

        test('uploader strings are trimmed or default to empty', () => {
            const cfg = contentsConfig({
                uploader: { belowUploadArea: '  U1  ', postUploadMessage: '  U2  ' },
            } as any);

            expect(cfg.uploader.belowUploadArea).toBe('U1');
            expect(cfg.uploader.postUploadMessage).toBe('U2');

            const cfg2 = contentsConfig({ uploader: {} } as any);
            expect(cfg2.uploader.belowUploadArea).toBe('');
            expect(cfg2.uploader.postUploadMessage).toBe('');
        });

        test('handles completely missing settings by returning defaults', () => {
            const cfg = contentsConfig(undefined as any);
            expect(cfg.header.right).toBe('');
            expect(cfg.header.onLogoRight).toBe('');
            expect(cfg.sidebar.mainMenuExtra.items).toEqual([]);
            expect(cfg.sidebar.navMenu.items).toEqual([]);
            expect(cfg.sidebar.footer).toBe('');
            expect(cfg.uploader.postUploadMessage).toBe('');
        });
    });
});
