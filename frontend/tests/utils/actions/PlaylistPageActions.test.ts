import * as PlaylistPageActions from '../../../src/static/js/utils/actions/PlaylistPageActions';

// Mock the dispatcher module used by PlaylistPageActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('PlaylistPageActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('loadPlaylistData', () => {
        it('Should dispatch LOAD_PLAYLIST_DATA without payload', () => {
            PlaylistPageActions.loadPlaylistData();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'LOAD_PLAYLIST_DATA' });
        });

        it('Should be idempotent in payload across multiple calls', () => {
            PlaylistPageActions.loadPlaylistData();
            PlaylistPageActions.loadPlaylistData();
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'LOAD_PLAYLIST_DATA' });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'LOAD_PLAYLIST_DATA' });
        });
    });

    describe('toggleSave', () => {
        it('Should dispatch TOGGLE_SAVE without payload', () => {
            PlaylistPageActions.toggleSave();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SAVE' });
        });
    });

    describe('updatePlaylist', () => {
        it('Should dispatch UPDATE_PLAYLIST with provided title and description', () => {
            const payload = { title: 'My Playlist', description: 'A description' };
            PlaylistPageActions.updatePlaylist(payload);
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_PLAYLIST', playlist_data: payload });
        });

        it('Should support empty strings for title and description', () => {
            const payload = { title: '', description: '' };
            PlaylistPageActions.updatePlaylist(payload);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_PLAYLIST', playlist_data: payload });
        });
    });

    describe('removePlaylist', () => {
        it('Should dispatch REMOVE_PLAYLIST without payload', () => {
            PlaylistPageActions.removePlaylist();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PLAYLIST' });
        });
    });

    describe('removedMediaFromPlaylist', () => {
        it('Should dispatch MEDIA_REMOVED_FROM_PLAYLIST with media and playlist ids', () => {
            PlaylistPageActions.removedMediaFromPlaylist('m1', 'p1');
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'MEDIA_REMOVED_FROM_PLAYLIST',
                media_id: 'm1',
                playlist_id: 'p1',
            });
        });

        it('Should allow empty ids as strings', () => {
            PlaylistPageActions.removedMediaFromPlaylist('', '');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'MEDIA_REMOVED_FROM_PLAYLIST',
                media_id: '',
                playlist_id: '',
            });
        });
    });

    describe('reorderedMediaInPlaylist', () => {
        it('Should dispatch PLAYLIST_MEDIA_REORDERED with provided array', () => {
            const items = [
                { id: '1', url: '/1', thumbnail_url: '/t1' },
                { id: '2', url: '/2', thumbnail_url: '/t2' },
            ];
            PlaylistPageActions.reorderedMediaInPlaylist(items);
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'PLAYLIST_MEDIA_REORDERED',
                playlist_media: items,
            });
        });

        it('Should support empty array for playlist media', () => {
            const items: any[] = [];
            PlaylistPageActions.reorderedMediaInPlaylist(items);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'PLAYLIST_MEDIA_REORDERED',
                playlist_media: items,
            });
        });

        it('Should not mutate the provided array reference', () => {
            const items: any[] = [{ id: 'a', url: '/a', thumbnail_url: '/ta' }];
            const originalRef = items;
            PlaylistPageActions.reorderedMediaInPlaylist(items);
            const dispatchedArg = (dispatcher.dispatch as jest.Mock).mock.calls[0][0].playlist_media;
            expect(dispatchedArg).toBe(originalRef);
        });
    });
});
