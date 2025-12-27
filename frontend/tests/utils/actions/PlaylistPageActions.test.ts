import { PlaylistPageActions } from '../../../src/static/js/utils/actions';
import { dispatcher } from '../../../src/static/js/utils/dispatcher';
// @todo: Revisit this behavior
// Mock the dispatcher module used by PlaylistPageActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({ dispatcher: { dispatch: jest.fn() } }));

describe('utils/actions', () => {
    describe('PlaylistPageActions', () => {
        const dispatch = dispatcher.dispatch;

        beforeEach(() => {
            (dispatcher.dispatch as jest.Mock).mockClear();
        });

        describe('loadPlaylistData', () => {
            it('Should dispatch LOAD_PLAYLIST_DATA', () => {
                PlaylistPageActions.loadPlaylistData();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_PLAYLIST_DATA' });
            });

            it('Should be idempotent for multiple calls', () => {
                PlaylistPageActions.loadPlaylistData();
                PlaylistPageActions.loadPlaylistData();
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'LOAD_PLAYLIST_DATA' });
                expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'LOAD_PLAYLIST_DATA' });
            });
        });

        describe('toggleSave', () => {
            it('Should dispatch TOGGLE_SAVE', () => {
                PlaylistPageActions.toggleSave();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SAVE' });
            });
        });

        describe('updatePlaylist', () => {
            it('Should dispatch UPDATE_PLAYLIST with provided title and description', () => {
                const payload = { title: 'My Playlist', description: 'A description' };
                PlaylistPageActions.updatePlaylist(payload);
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_PLAYLIST', playlist_data: payload });
            });

            // @todo: Revisit this behavior
            it('Should support empty strings for title and description', () => {
                const payload = { title: '', description: '' };
                PlaylistPageActions.updatePlaylist(payload);
                expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_PLAYLIST', playlist_data: payload });
            });
        });

        describe('removePlaylist', () => {
            it('Should dispatch REMOVE_PLAYLIST without payload', () => {
                PlaylistPageActions.removePlaylist();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PLAYLIST' });
            });
        });

        describe('removedMediaFromPlaylist', () => {
            it('Should dispatch MEDIA_REMOVED_FROM_PLAYLIST with media and playlist ids', () => {
                PlaylistPageActions.removedMediaFromPlaylist('m1', 'p1');
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'MEDIA_REMOVED_FROM_PLAYLIST',
                    media_id: 'm1',
                    playlist_id: 'p1',
                });
            });

            // @todo: Revisit this behavior
            it('Should allow empty ids as strings', () => {
                PlaylistPageActions.removedMediaFromPlaylist('', '');
                expect(dispatch).toHaveBeenCalledWith({
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
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'PLAYLIST_MEDIA_REORDERED', playlist_media: items });
            });

            // @todo: Revisit this behavior
            it('Should support empty array for playlist media', () => {
                const items: any[] = [];
                PlaylistPageActions.reorderedMediaInPlaylist(items);
                expect(dispatch).toHaveBeenCalledWith({ type: 'PLAYLIST_MEDIA_REORDERED', playlist_media: items });
            });
        });
    });
});
