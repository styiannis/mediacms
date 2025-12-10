import { dispatcher } from '../dispatcher';

export function loadMediaData() {
    dispatcher.dispatch({ type: 'LOAD_MEDIA_DATA' });
}

export function likeMedia() {
    dispatcher.dispatch({ type: 'LIKE_MEDIA' });
}

export function dislikeMedia() {
    dispatcher.dispatch({ type: 'DISLIKE_MEDIA' });
}

export function reportMedia(reportDescription) {
    dispatcher.dispatch({
        type: 'REPORT_MEDIA',
        reportDescription: !!reportDescription ? reportDescription.replace(/\s/g, '') : '',
    });
}

export function copyShareLink(inputElem) {
    dispatcher.dispatch({ type: 'COPY_SHARE_LINK', inputElement: inputElem });
}

export function copyEmbedMediaCode(inputElem) {
    dispatcher.dispatch({ type: 'COPY_EMBED_MEDIA_CODE', inputElement: inputElem });
}

export function removeMedia() {
    dispatcher.dispatch({ type: 'REMOVE_MEDIA' });
}

export function submitComment(commentText) {
    dispatcher.dispatch({ type: 'SUBMIT_COMMENT', commentText });
}

export function deleteComment(commentId) {
    dispatcher.dispatch({ type: 'DELETE_COMMENT', commentId });
}

export function createPlaylist(playlist_data) {
    dispatcher.dispatch({ type: 'CREATE_PLAYLIST', playlist_data });
}

export function addMediaToPlaylist(playlist_id, media_id) {
    dispatcher.dispatch({ type: 'ADD_MEDIA_TO_PLAYLIST', playlist_id, media_id });
}

export function removeMediaFromPlaylist(playlist_id, media_id) {
    dispatcher.dispatch({ type: 'REMOVE_MEDIA_FROM_PLAYLIST', playlist_id, media_id });
}

export function addNewPlaylist(playlist_data) {
    dispatcher.dispatch({ type: 'APPEND_NEW_PLAYLIST', playlist_data });
}
