import PageStoreModule from '../../../src/static/js/utils/stores/PageStore';

// Mocks for external dependencies and browser APIs
jest.mock('../../../src/static/js/utils/classes/', () => ({
    BrowserCache: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockReturnValue(undefined),
        set: jest.fn(),
    })),
}));

jest.mock('../../../src/static/js/utils/helpers', () => ({
    BrowserEvents: jest.fn().mockImplementation(() => ({
        doc: jest.fn(),
        win: jest.fn(),
    })),
    exportStore: (instance: any) => instance,
}));

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn().mockImplementation(() => ({
        site: { id: 'site-id' },
        api: { playlists: '/api/playlists' },
        contents: { a: 1 },
        enabled: { features: ['x'] },
        media: { item: { fields: [] } },
        options: { theme: 'light' },
    })),
}));

// crypto.getRandomValues mock
(window as any).crypto = {
    getRandomValues: (arr: Uint32Array) => {
        for (let i = 0; i < arr.length; i++) arr[i] = i + 1;
        return arr;
    },
};

// performance.now mock
(global as any).performance = (global as any).performance || ({} as any);
(global as any).performance.now = () => 123.456;

// Intl.DateTimeFormat mock
(global as any).Intl = (global as any).Intl || ({} as any);
(global as any).Intl.DateTimeFormat = jest.fn().mockImplementation(() => ({
    resolvedOptions: () => ({ timeZone: 'UTC' }),
}));

// Date.now mock
const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1700000000000);

describe('PageStore', () => {
    function createStore() {
        // Re-require to ensure constructor runs with current mocks
        const Store = (PageStoreModule as any).default || PageStoreModule;
        return Store; // exportStore returns instance
    }

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    test('Handles INIT_PAGE action and exposes current-page', () => {
        const store: any = createStore();

        const handler = store.actions_handler.bind(store);
        const onInit = jest.fn();
        store.on('page_init', onInit);

        handler({ type: 'INIT_PAGE', page: 'home' });

        expect(onInit).toHaveBeenCalled();
        expect(store.get('current-page')).toBe('home');
    });

    test('Toggles auto play, persists to cache, and emits event', () => {
        const store: any = createStore();

        // Setup BrowserCache.set spy via mock instance
        const { BrowserCache } = require('../../../src/static/js/utils/classes/');
        const cacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const setSpy = cacheInstance.set;

        const onToggle = jest.fn();
        store.on('switched_media_auto_play', onToggle);

        const initial = store.get('media-auto-play');
        store.actions_handler({ type: 'TOGGLE_AUTO_PLAY' });

        expect(onToggle).toHaveBeenCalled();
        expect(store.get('media-auto-play')).toBe(!initial);
        expect(setSpy).toHaveBeenCalledWith('media-auto-play', !initial);
    });

    test('Adds notification and emits event', () => {
        const store: any = createStore();

        const onAdd = jest.fn();
        store.on('added_notification', onAdd);

        store.actions_handler({ type: 'ADD_NOTIFICATION', notification: 'new-note' });

        expect(onAdd).toHaveBeenCalled();
        expect(store.get('notifications-size')).toBe(1);
        const msgs = store.get('notifications');
        expect(msgs.length).toBe(1);
        expect(typeof msgs[0][0]).toBe('string'); // id produced by uniqid
        expect(msgs[0][1]).toBe('new-note');
    });

    test('Emits browser events for visibility, scroll and resize', () => {
        const store: any = createStore();

        const vis = jest.fn();
        const scr = jest.fn();
        const res = jest.fn();

        store.on('document_visibility_change', vis);
        store.on('window_scroll', scr);
        store.on('window_resize', res);

        // Trigger internal handlers directly
        store.onDocumentVisibilityChange();
        store.onWindowScroll();
        store.onWindowResize();

        expect(vis).toHaveBeenCalled();
        expect(scr).toHaveBeenCalled();
        expect(res).toHaveBeenCalled();
    });
});
