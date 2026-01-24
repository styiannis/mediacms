import { taxonomiesConfig } from '../../../src/static/js/utils/settings/taxonomies';

// The tests in this suite follow the style used in other utils-settings tests:
// - deterministic inputs/outputs
// - minimal/no mocks
// - direct assertions on returned structures

describe('utils/settings', () => {
    describe('taxonomies', () => {
        test('Should return defaults when settings is undefined', () => {
            const res = taxonomiesConfig();
            expect(res).toStrictEqual({
                tags: { enabled: false, title: 'Tags' },
                categories: { enabled: false, title: 'Categories' },
            });
        });

        test('Should enable a taxonomy when enabled is true', () => {
            const res = taxonomiesConfig({ tags: { enabled: true } as any });
            expect(res.tags.enabled).toBe(true);
            expect(res.tags.title).toBe('Tags');
        });

        test('Should keep taxonomy disabled when enabled is explicitly false', () => {
            const res = taxonomiesConfig({ categories: { enabled: false } as any });
            expect(res.categories.enabled).toBe(false);
            expect(res.categories.title).toBe('Categories');
        });

        test('Should default to enabled=true when enabled is omitted but key exists', () => {
            const res = taxonomiesConfig({ tags: {} as any });
            expect(res.tags.enabled).toBe(true);
        });

        test('Should trim title when provided', () => {
            const res = taxonomiesConfig({ tags: { title: '  My Tags  ' } as any });
            expect(res.tags.title).toBe('My Tags');
        });

        test('Should ignore unknown taxonomy keys', () => {
            const input: any = {
                unknownKey: { enabled: true, title: 'X' },
                tags: { enabled: true, title: 'Tagz' },
            };
            const res = taxonomiesConfig(input);

            expect(res).toStrictEqual({
                tags: { enabled: true, title: 'Tagz' },
                categories: { enabled: false, title: 'Categories' },
            });
        });

        test('Should not change title when title is undefined', () => {
            const res = taxonomiesConfig({ categories: { enabled: true, title: undefined } as any });
            expect(res.categories.title).toBe('Categories');
            expect(res.categories.enabled).toBe(true);
        });
    });
});
