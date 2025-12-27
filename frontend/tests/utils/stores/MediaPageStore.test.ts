import store from '../../../src/static/js/utils/stores/MediaPageStore';

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
    describe('MediaPageStore', () => {
        const handler = store.actions_handler.bind(store);

        const onLoadedViewerPlaylistData = jest.fn();
        const onLoadedPagePlaylistData = jest.fn();
        const onLoadedViewerPlaylistError = jest.fn();
        const onLoadedVideoData = jest.fn();
        const onLoadedImageData = jest.fn();
        const onLoadedMediaData = jest.fn();
        const onLoadedMediaError = jest.fn();
        const onCommentsLoad = jest.fn();
        const onUsersLoad = jest.fn();
        const onPlaylistsLoad = jest.fn();
        const onLikedMediaFailedRequest = jest.fn();
        const onLikedMedia = jest.fn();
        const onDislikedMediaFailedRequest = jest.fn();
        const onDislikedMedia = jest.fn();
        const onReportedMedia = jest.fn();
        const onPlaylistCreationCompleted = jest.fn();
        const onPlaylistCreationFailed = jest.fn();
        const onMediaPlaylistAdditionCompleted = jest.fn();
        const onMediaPlaylistAdditionFailed = jest.fn();
        const onMediaPlaylistRemovalCompleted = jest.fn();
        const onMediaPlaylistRemovalFailed = jest.fn();
        const onCopiedMediaLink = jest.fn();
        const onCopiedEmbedMediaCode = jest.fn();
        const onMediaDelete = jest.fn();
        const onMediaDeleteFail = jest.fn();
        const onCommentDeleteFail = jest.fn();
        const onCommentDelete = jest.fn();
        const onCommentSubmitFail = jest.fn();
        const onCommentSubmit = jest.fn();

        store.on('loaded_viewer_playlist_data', onLoadedViewerPlaylistData);
        store.on('loaded_page_playlist_data', onLoadedPagePlaylistData);
        store.on('loaded_viewer_playlist_error', onLoadedViewerPlaylistError);
        store.on('loaded_page_playlist_data', onLoadedPagePlaylistData);
        store.on('loaded_video_data', onLoadedVideoData);
        store.on('loaded_image_data', onLoadedImageData);
        store.on('loaded_media_data', onLoadedMediaData);
        store.on('loaded_media_error', onLoadedMediaError);
        store.on('comments_load', onCommentsLoad);
        store.on('users_load', onUsersLoad);
        store.on('playlists_load', onPlaylistsLoad);
        store.on('liked_media_failed_request', onLikedMediaFailedRequest);
        store.on('liked_media', onLikedMedia);
        store.on('disliked_media_failed_request', onDislikedMediaFailedRequest);
        store.on('disliked_media', onDislikedMedia);
        store.on('reported_media', onReportedMedia);
        store.on('playlist_creation_completed', onPlaylistCreationCompleted);
        store.on('playlist_creation_failed', onPlaylistCreationFailed);
        store.on('media_playlist_addition_completed', onMediaPlaylistAdditionCompleted);
        store.on('media_playlist_addition_failed', onMediaPlaylistAdditionFailed);
        store.on('media_playlist_removal_completed', onMediaPlaylistRemovalCompleted);
        store.on('media_playlist_removal_failed', onMediaPlaylistRemovalFailed);
        store.on('loaded_page_playlist_data', onLoadedPagePlaylistData);
        store.on('copied_media_link', onCopiedMediaLink);
        store.on('copied_embed_media_code', onCopiedEmbedMediaCode);
        store.on('media_delete', onMediaDelete);
        store.on('media_delete_fail', onMediaDeleteFail);
        store.on('comment_delete_fail', onCommentDeleteFail);
        store.on('comment_delete', onCommentDelete);
        store.on('comment_submit_fail', onCommentSubmitFail);
        store.on('comment_submit', onCommentSubmit);

        // @todo: Revisit initial values
        test('Validate initial values', () => {
            expect(store.get('users')).toStrictEqual([]);
            expect(store.get('playlists')).toStrictEqual([]);
            expect(store.get('media-load-error-type')).toBe(null);
            expect(store.get('media-load-error-message')).toBe(null);
            expect(store.get('media-comments')).toStrictEqual([]);
            expect(store.get('media-data')).toBe(null);
            expect(store.get('media-id')).toBe(undefined);
            expect(store.get('media-url')).toBe('N/A');
            expect(store.get('media-edit-subtitle-url')).toBe(null);
            expect(store.get('media-likes')).toBe('N/A');
            expect(store.get('media-dislikes')).toBe('N/A');
            expect(store.get('media-summary')).toBe(null);
            expect(store.get('media-categories')).toStrictEqual([]);
            expect(store.get('media-tags')).toStrictEqual([]);
            expect(store.get('media-type')).toBe(null);
            expect(store.get('media-original-url')).toBe(null);
            expect(store.get('media-thumbnail-url')).toBe(null);
            expect(store.get('user-liked-media')).toBe(false);
            expect(store.get('user-disliked-media')).toBe(false);
            expect(store.get('media-author-thumbnail-url')).toBe(null);
            expect(store.get('playlist-data')).toBe(null);
            expect(store.get('playlist-id')).toBe(null);
            expect(store.get('playlist-next-media-url')).toBe(null);
            expect(store.get('playlist-previous-media-url')).toBe(null);
        });

        describe('Trigger and validate actions behavior', () => {
            // @todo: Continue here...
            test('Action type: "LOAD_MEDIA_DATA"', () => {
                // handler({ type: 'LOAD_MEDIA_DATA' });
            });

            // @todo: Continue here...
            test('Action type: "LIKE_MEDIA"', () => {
                // handler({ type: 'LIKE_MEDIA' });
            });

            // @todo: Continue here...
            test('Action type: "DISLIKE_MEDIA"', () => {
                // handler({ type: 'DISLIKE_MEDIA' });
            });

            // @todo: Continue here...
            test('Action type: "REPORT_MEDIA"', () => {
                // handler({ type: 'REPORT_MEDIA', reportDescription: '...' });
            });

            // @todo: Continue here...
            test('Action type: "COPY_SHARE_LINK"', () => {
                // handler({ type: 'COPY_SHARE_LINK', inputElement: '...' });
            });

            // @todo: Continue here...
            test('Action type: "COPY_EMBED_MEDIA_CODE"', () => {
                // handler({ type: 'COPY_EMBED_MEDIA_CODE', inputElement: "..." });
            });

            // @todo: Continue here...
            test('Action type: "REMOVE_MEDIA"', () => {
                // handler({ type: 'REMOVE_MEDIA' });
            });

            // @todo: Continue here...
            test('Action type: "SUBMIT_COMMENT"', () => {
                // handler({ type: 'SUBMIT_COMMENT', commentText: "..." });
            });

            // @todo: Continue here...
            test('Action type: "DELETE_COMMENT"', () => {
                // handler({ type: 'DELETE_COMMENT', commentId: "..." });
            });

            // @todo: Continue here...
            test('Action type: "CREATE_PLAYLIST"', () => {
                // handler({ type: 'CREATE_PLAYLIST', playlist_data: {} });
            });

            // @todo: Continue here...
            test('Action type: "ADD_MEDIA_TO_PLAYLIST"', () => {
                // handler({ type: 'ADD_MEDIA_TO_PLAYLIST', playlist_id: "...", media_id: "..." });
            });

            // @todo: Continue here...
            test('Action type: "REMOVE_MEDIA_FROM_PLAYLIST"', () => {
                // handler({ type: 'REMOVE_MEDIA_FROM_PLAYLIST', playlist_id: "...", media_id: "..." });
            });

            // @todo: Continue here...
            test('Action type: "APPEND_NEW_PLAYLIST"', () => {
                // handler({ type: 'APPEND_NEW_PLAYLIST', playlist_data: {} });
            });
        });
    });
});
