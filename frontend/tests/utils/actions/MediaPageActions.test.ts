import * as MediaPageActions from '../../../src/static/js/utils/actions/MediaPageActions';

// Mock the dispatcher module used by MediaPageActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('MediaPageActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('loadMediaData', () => {
        it('Should dispatch LOAD_MEDIA_DATA with no payload', () => {
            MediaPageActions.loadMediaData();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'LOAD_MEDIA_DATA' });
        });

        it('Should be idempotent for multiple calls (same payload)', () => {
            MediaPageActions.loadMediaData();
            MediaPageActions.loadMediaData();
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'LOAD_MEDIA_DATA' });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'LOAD_MEDIA_DATA' });
        });
    });

    describe('likeMedia / dislikeMedia', () => {
        it('Should dispatch LIKE_MEDIA action', () => {
            MediaPageActions.likeMedia();
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'LIKE_MEDIA' });
        });

        it('Should dispatch DISLIKE_MEDIA action', () => {
            MediaPageActions.dislikeMedia();
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'DISLIKE_MEDIA' });
        });
    });

    describe('reportMedia', () => {
        it('Should dispatch REPORT_MEDIA with stripped description when provided', () => {
            MediaPageActions.reportMedia('  some   text  ');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'REPORT_MEDIA',
                reportDescription: 'sometext',
            });
        });

        it('Should dispatch REPORT_MEDIA with empty string when description is undefined', () => {
            MediaPageActions.reportMedia();
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'REPORT_MEDIA',
                reportDescription: '',
            });
        });

        it('Should remove all whitespace characters including newlines and tabs', () => {
            MediaPageActions.reportMedia('\n\t spaced\ntext \t');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'REPORT_MEDIA',
                reportDescription: 'spacedtext',
            });
        });
    });

    describe('copyShareLink / copyEmbedMediaCode', () => {
        it('Should dispatch COPY_SHARE_LINK carrying the provided input element', () => {
            const inputElem = document.createElement('input');
            MediaPageActions.copyShareLink(inputElem);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'COPY_SHARE_LINK', inputElement: inputElem });
        });

        it('Should dispatch COPY_EMBED_MEDIA_CODE carrying the provided textarea element', () => {
            const textarea = document.createElement('textarea');
            MediaPageActions.copyEmbedMediaCode(textarea);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'COPY_EMBED_MEDIA_CODE', inputElement: textarea });
        });
    });

    describe('removeMedia', () => {
        it('Should dispatch REMOVE_MEDIA action', () => {
            MediaPageActions.removeMedia();
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REMOVE_MEDIA' });
        });
    });

    describe('comments', () => {
        it('Should dispatch SUBMIT_COMMENT with provided text', () => {
            MediaPageActions.submitComment('Nice one');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SUBMIT_COMMENT', commentText: 'Nice one' });
        });

        it('Should dispatch DELETE_COMMENT with provided id', () => {
            MediaPageActions.deleteComment('c-123');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'DELETE_COMMENT', commentId: 'c-123' });
        });

        it('Should allow numeric comment id for delete', () => {
            MediaPageActions.deleteComment(42);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'DELETE_COMMENT', commentId: 42 });
        });
    });

    describe('playlists', () => {
        it('Should dispatch CREATE_PLAYLIST with provided data', () => {
            const payload = { title: 'My list', description: 'Desc' };
            MediaPageActions.createPlaylist(payload);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'CREATE_PLAYLIST', playlist_data: payload });
        });

        it('Should dispatch ADD_MEDIA_TO_PLAYLIST with ids', () => {
            MediaPageActions.addMediaToPlaylist('pl-1', 'm-1');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'ADD_MEDIA_TO_PLAYLIST', playlist_id: 'pl-1', media_id: 'm-1' });
        });

        it('Should dispatch REMOVE_MEDIA_FROM_PLAYLIST with ids', () => {
            MediaPageActions.removeMediaFromPlaylist('pl-1', 'm-1');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REMOVE_MEDIA_FROM_PLAYLIST', playlist_id: 'pl-1', media_id: 'm-1' });
        });

        it('Should dispatch APPEND_NEW_PLAYLIST with provided playlist data', () => {
            const playlist = {
                playlist_id: 'pl-2',
                add_date: new Date('2020-01-01T00:00:00Z'),
                description: 'Cool',
                title: 'T',
                media_list: ['a', 'b'],
            };
            MediaPageActions.addNewPlaylist(playlist);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'APPEND_NEW_PLAYLIST', playlist_data: playlist });
        });
    });
});
