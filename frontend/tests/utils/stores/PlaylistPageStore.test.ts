import store from '../../../src/static/js/utils/stores/PlaylistPageStore';

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn(() => jest.requireActual('../../tests-constants').sampleMediaCMSConfig),
}));

describe('utils/store', () => {
    describe('PlaylistPageStore', () => {
        const handler = store.actions_handler.bind(store);

        const onLoadedPlaylistData = jest.fn();
        const onLoadedPlaylistEerror = jest.fn();
        const onLoadedMediaError = jest.fn();
        const onPlaylistUpdateCompleted = jest.fn();
        const onPlaylistUpdateFailed = jest.fn();
        const onPlaylistRemovalCompleted = jest.fn();
        const onPlaylistRemovalFailed = jest.fn();
        const onSavedUpdated = jest.fn();
        const onReorderedMediaInPlaylist = jest.fn();
        const onRemovedMediaFromPlaylist = jest.fn();

        store.on('loaded_playlist_data', onLoadedPlaylistData);
        store.on('loaded_playlist_error', onLoadedPlaylistEerror);
        store.on('loaded_media_error', onLoadedMediaError);
        store.on('playlist_update_completed', onPlaylistUpdateCompleted);
        store.on('playlist_update_failed', onPlaylistUpdateFailed);
        store.on('playlist_removal_completed', onPlaylistRemovalCompleted);
        store.on('playlist_removal_failed', onPlaylistRemovalFailed);
        store.on('saved-updated', onSavedUpdated);
        store.on('reordered_media_in_playlist', onReorderedMediaInPlaylist);
        store.on('removed_media_from_playlist', onRemovedMediaFromPlaylist);

        // @todo: Revisit initial values
        test('Validate initial values', () => {
            expect(store.get('playlistId')).toBe(null);
            expect(store.get('logged-in-user-playlist')).toBe(false);
            expect(store.get('playlist-media')).toStrictEqual([]);
            expect(store.get('visibility')).toBe('public');
            expect(store.get('visibility-icon')).toBe(null);
            // expect(store.get('total-items')).toBe(null); // @todo
            expect(store.get('views-count')).toBe('N/A');
            expect(store.get('title')).toBe(null);
            expect(store.get('edit-link')).toBe('#');
            expect(store.get('thumb')).toBe(null);
            expect(store.get('description')).toBe(null);
            expect(store.get('author-username')).toBe(null);
            expect(store.get('author-name')).toBe(null);
            expect(store.get('author-link')).toBe(null);
            expect(store.get('author-thumb')).toBe(null);
            expect(store.get('saved-playlist')).toBe(false);
            expect(store.get('date-label')).toBe(null);
        });

        describe('Trigger and validate actions behavior', () => {
            // @todo: Continue here...
            test('Action type: "LOAD_PLAYLIST_DATA"', () => {
                // handler({ type: 'LOAD_PLAYLIST_DATA' });
            });

            // @todo: Continue here...
            test('Action type: "TOGGLE_SAVE"', () => {
                // handler({ type: 'TOGGLE_SAVE' });
            });

            // @todo: Continue here...
            test('Action type: "UPDATE_PLAYLIST"', () => {
                // handler({ type: 'UPDATE_PLAYLIST', playlist_data: {} });
            });

            // @todo: Continue here...
            test('Action type: "REMOVE_PLAYLIST"', () => {
                // handler({ type: 'REMOVE_PLAYLIST' });
            });

            // @todo: Continue here...
            test('Action type: "PLAYLIST_MEDIA_REORDERED"', () => {
                // handler({ type: 'PLAYLIST_MEDIA_REORDERED', playlist_media: "..." });
            });

            // @todo: Continue here...
            test('Action type: "MEDIA_REMOVED_FROM_PLAYLIST"', () => {
                // handler({ type: 'MEDIA_REMOVED_FROM_PLAYLIST', media_id: "..." });
            });
        });
    });
});
