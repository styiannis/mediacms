import { BrowserCache } from '../../../src/static/js/utils/classes/';
import store from '../../../src/static/js/utils/stores/PlaylistViewStore';

jest.mock('../../../src/static/js/utils/classes/', () => ({
    BrowserCache: jest.fn().mockImplementation(() => ({
        get: jest.fn(),
        set: jest.fn(),
    })),
}));

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn(() => jest.requireActual('../../tests-constants').sampleMediaCMSConfig),
}));

describe('utils/store', () => {
    describe('PlaylistViewStore', () => {
        const browserCacheInstance = (BrowserCache as jest.Mock).mock.results[0].value;
        const browserCacheSetSpy = browserCacheInstance.set;

        const handler = store.actions_handler.bind(store);

        const onLoopRepeatUpdated = jest.fn();
        const onShuffleUpdated = jest.fn();
        const onSavedUpdated = jest.fn();

        store.on('loop-repeat-updated', onLoopRepeatUpdated);
        store.on('shuffle-updated', onShuffleUpdated);
        store.on('saved-updated', onSavedUpdated);

        // @todo: Revisit initial values
        test('Validate initial values', () => {
            expect(store.get('logged-in-user-playlist')).toBe(false);
            expect(store.get('enabled-loop')).toBe(undefined);
            expect(store.get('enabled-shuffle')).toBe(undefined);
            expect(store.get('saved-playlist')).toBe(false);
        });

        describe('Trigger and validate actions behavior', () => {
            // @todo: Revisit the code of this action. It needs to be fixed.
            test('Action type: "TOGGLE_LOOP"', () => {
                handler({ type: 'TOGGLE_LOOP' });

                expect(onLoopRepeatUpdated).toHaveBeenCalledWith();
                expect(onLoopRepeatUpdated).toHaveBeenCalledTimes(1);

                expect(store.get('enabled-loop')).toBe(undefined);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('loopPlaylist[null]', true);
            });

            // @todo: Revisit the code of this action. It needs to be fixed.
            test('Action type: "TOGGLE_SHUFFLE"', () => {
                handler({ type: 'TOGGLE_SHUFFLE' });

                expect(onShuffleUpdated).toHaveBeenCalledWith();
                expect(onShuffleUpdated).toHaveBeenCalledTimes(1);

                expect(store.get('enabled-shuffle')).toBe(undefined);
                expect(browserCacheSetSpy).toHaveBeenCalledWith('shufflePlaylist[null]', true);
            });

            test('Action type: "TOGGLE_SAVE"', () => {
                const initialValue = store.get('saved-playlist');

                handler({ type: 'TOGGLE_SAVE' });

                expect(onSavedUpdated).toHaveBeenCalledWith();
                expect(onSavedUpdated).toHaveBeenCalledTimes(1);

                expect(store.get('saved-playlist')).toBe(!initialValue);
            });
        });
    });
});
