import { BrowserCache } from '../../../src/static/js/utils/classes/';
import store from '../../../src/static/js/utils/stores/VideoViewerStore';

jest.mock('../../../src/static/js/utils/classes/', () => ({
    BrowserCache: jest.fn().mockImplementation(() => ({
        get: (key: string) => {
            let result: any = undefined;
            switch (key) {
                case 'in-theater-mode':
                    result = true;
                    break;
                case 'player-volume':
                    result = 0.6;
                    break;
                case 'player-sound-muted':
                    result = false;
                    break;
                case 'video-quality':
                    result = 720;
                    break;
                case 'video-playback-speed':
                    result = 2;
                    break;
            }
            return result;
        },
        set: jest.fn(),
    })),
}));

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn(() => jest.requireActual('../../tests-constants').sampleMediaCMSConfig),
}));

describe('utils/store', () => {
    describe('VideoViewerStore', () => {
        const browserCacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const browserCacheSetSpy = browserCacheInstance.set;

        const handler = store.actions_handler.bind(store);

        const onChangedViewerMode = jest.fn();
        const onChangedPlayerVolume = jest.fn();
        const onChangedPlayerSoundMuted = jest.fn();
        const onChangedVideoQuality = jest.fn();
        const onChangedVideoPlaybackSpeed = jest.fn();

        store.on('changed_viewer_mode', onChangedViewerMode);
        store.on('changed_player_volume', onChangedPlayerVolume);
        store.on('changed_player_sound_muted', onChangedPlayerSoundMuted);
        store.on('changed_video_quality', onChangedVideoQuality);
        store.on('changed_video_playback_speed', onChangedVideoPlaybackSpeed);

        test('Validate initial values', () => {
            expect(store.get('player-volume')).toBe(0.6);
            expect(store.get('player-sound-muted')).toBe(false);
            expect(store.get('in-theater-mode')).toBe(true);
            // @todo: Revisit the key 'video-data'
            expect(store.get('video-data')).toBe(undefined);
            expect(store.get('video-quality')).toBe(720);
            expect(store.get('video-playback-speed')).toBe(2);
        });

        describe('Trigger and validate actions behavior', () => {
            test('Action type: "TOGGLE_VIEWER_MODE"', () => {
                const initialValue = store.get('video-playback-speed');

                handler({ type: 'TOGGLE_VIEWER_MODE' });

                expect(onChangedViewerMode).toHaveBeenCalledWith();
                expect(onChangedViewerMode).toHaveBeenCalledTimes(1);

                expect(store.get('in-theater-mode')).toBe(!initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('in-theater-mode', !initialValue);
            });

            test('Action type: "SET_VIEWER_MODE"', () => {
                const initialValue = store.get('in-theater-mode');

                handler({ type: 'SET_VIEWER_MODE', inTheaterMode: !initialValue });

                expect(onChangedViewerMode).toHaveBeenCalledWith();
                expect(onChangedViewerMode).toHaveBeenCalledTimes(2); // The first time called by 'TOGGLE_VIEWER_MODE' action.

                expect(store.get('in-theater-mode')).toBe(!initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('in-theater-mode', !initialValue);
            });

            test('Action type: "SET_PLAYER_VOLUME"', () => {
                const initialValue = store.get('player-volume');

                handler({ type: 'SET_PLAYER_VOLUME', playerVolume: 0.3 });

                expect(onChangedPlayerVolume).toHaveBeenCalledWith();
                expect(onChangedPlayerVolume).toHaveBeenCalledTimes(1);

                expect(store.get('player-volume')).toBe(0.3);
                expect(store.get('player-volume')).not.toBe(initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('player-volume', 0.3);
            });

            test('Action type: "SET_PLAYER_SOUND_MUTED"', () => {
                const initialValue = store.get('player-sound-muted');

                handler({ type: 'SET_PLAYER_SOUND_MUTED', playerSoundMuted: !initialValue });

                expect(onChangedPlayerSoundMuted).toHaveBeenCalledWith();
                expect(onChangedPlayerSoundMuted).toHaveBeenCalledTimes(1);

                expect(store.get('player-sound-muted')).toBe(!initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('player-sound-muted', !initialValue);
            });

            test('Action type: "SET_VIDEO_QUALITY"', () => {
                const initialValue = store.get('video-quality');

                handler({ type: 'SET_VIDEO_QUALITY', quality: 1080 });

                expect(onChangedVideoQuality).toHaveBeenCalledWith();
                expect(onChangedVideoQuality).toHaveBeenCalledTimes(1);

                expect(store.get('video-quality')).toBe(1080);
                expect(store.get('video-quality')).not.toBe(initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('video-quality', 1080);
            });

            test('Action type: "SET_VIDEO_PLAYBACK_SPEED"', () => {
                const initialValue = store.get('video-playback-speed');

                handler({ type: 'SET_VIDEO_PLAYBACK_SPEED', playbackSpeed: 1.5 });

                expect(onChangedVideoPlaybackSpeed).toHaveBeenCalledWith();
                expect(onChangedVideoPlaybackSpeed).toHaveBeenCalledTimes(1);

                expect(store.get('video-playback-speed')).toBe(1.5);
                expect(store.get('video-playback-speed')).not.toBe(initialValue);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('video-playback-speed', 1.5);
            });
        });
    });
});
