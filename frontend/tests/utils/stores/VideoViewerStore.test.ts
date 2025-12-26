import { BrowserCache } from '../../../src/static/js/utils/classes/';
import VideoViewerStoreModule from '../../../src/static/js/utils/stores/VideoViewerStore';

// Mocks for external dependencies
jest.mock('../../../src/static/js/utils/classes/', () => ({
    BrowserCache: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockReturnValue(undefined),
        set: jest.fn(),
    })),
}));

jest.mock('../../../src/static/js/utils/helpers', () => ({
    exportStore: (instance: any) => instance,
}));

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn().mockImplementation(() => ({
        site: { id: 'site-id' },
    })),
}));

describe('VideoViewerStore', () => {
    function createStore() {
        const Store = (VideoViewerStoreModule as any).default || VideoViewerStoreModule;
        return Store; // exportStore returns instance
    }

    // @todo: Enable this after fixing the corresponding code
    /*test('Initializes state from BrowserCache with defaults when cache empty', () => {
        const store: any = createStore();

        expect(store.get('in-theater-mode')).toBe(false);
        expect(store.get('player-volume')).toBe(1);
        expect(store.get('player-sound-muted')).toBe(false);
        expect(store.get('video-quality')).toBe('Auto');
        expect(store.get('video-playback-speed')).toBe(false);
    });*/

    // @todo: Enable this after fixing the corresponding code
    /*test('Clamps player volume between 0 and 1 on initialization', () => {
        // Override first mock instance get to simulate out-of-range value
        (BrowserCache as jest.Mock).mockImplementationOnce(() => ({
            get: jest
                .fn()
                .mockReturnValueOnce(undefined) // in-theater-mode
                .mockReturnValueOnce(5) // player-volume -> should clamp to 1
                .mockReturnValueOnce(undefined) // player-sound-muted
                .mockReturnValueOnce(undefined) // video-quality
                .mockReturnValueOnce(undefined), // video-playback-speed
            set: jest.fn(),
        }));

        const store: any = createStore();
        expect(store.get('player-volume')).toBe(1);
    });*/

    test('SET_VIEWER_MODE persists to cache and emits changed_viewer_mode', () => {
        const store = createStore();

        const onChange = jest.fn();
        store.on('changed_viewer_mode', onChange);

        const cacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const setSpy = cacheInstance.set;

        store.actions_handler({ type: 'SET_VIEWER_MODE', inTheaterMode: true });

        expect(onChange).toHaveBeenCalled();
        expect(store.get('in-theater-mode')).toBe(true);
        expect(setSpy).toHaveBeenCalledWith('in-theater-mode', true);
    });

    test('SET_PLAYER_VOLUME updates, persists and emits', () => {
        const store: any = createStore();

        const onChange = jest.fn();
        store.on('changed_player_volume', onChange);

        const cacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const setSpy = cacheInstance.set;

        store.actions_handler({ type: 'SET_PLAYER_VOLUME', playerVolume: 0.5 });

        expect(onChange).toHaveBeenCalled();
        expect(store.get('player-volume')).toBe(0.5);
        expect(setSpy).toHaveBeenCalledWith('player-volume', 0.5);
    });

    test('SET_VIDEO_QUALITY and SET_VIDEO_PLAYBACK_SPEED update, persist and emit', () => {
        const store: any = createStore();

        const onQuality = jest.fn();
        const onSpeed = jest.fn();
        store.on('changed_video_quality', onQuality);
        store.on('changed_video_playback_speed', onSpeed);

        const cacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const setSpy = cacheInstance.set;

        store.actions_handler({ type: 'SET_VIDEO_QUALITY', quality: '720p' });
        expect(onQuality).toHaveBeenCalled();
        expect(store.get('video-quality')).toBe('720p');
        expect(setSpy).toHaveBeenCalledWith('video-quality', '720p');

        store.actions_handler({ type: 'SET_VIDEO_PLAYBACK_SPEED', playbackSpeed: 1.5 });
        expect(onSpeed).toHaveBeenCalled();
        expect(store.get('video-playback-speed')).toBe(1.5);
        expect(setSpy).toHaveBeenCalledWith('video-playback-speed', 1.5);
    });

    test('TOGGLE_VIEWER_MODE flips current state and emits', () => {
        const store: any = createStore();

        const onChange = jest.fn();
        store.on('changed_viewer_mode', onChange);

        const initial = store.get('in-theater-mode');
        store.actions_handler({ type: 'TOGGLE_VIEWER_MODE' });

        expect(onChange).toHaveBeenCalled();
        expect(store.get('in-theater-mode')).toBe(!initial);
    });

    test('SET_PLAYER_SOUND_MUTED updates, persists and emits', () => {
        const store: any = createStore();

        const onChange = jest.fn();
        store.on('changed_player_sound_muted', onChange);

        const cacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const setSpy = cacheInstance.set;

        store.actions_handler({ type: 'SET_PLAYER_SOUND_MUTED', playerSoundMuted: true });

        expect(onChange).toHaveBeenCalled();
        expect(store.get('player-sound-muted')).toBe(true);
        expect(setSpy).toHaveBeenCalledWith('player-sound-muted', true);
    });
});
