import { dispatcher } from '../dispatcher';

export function loadPlaylistData() {
    dispatcher.dispatch({ type: 'LOAD_PLAYLIST_DATA' });
}

export function toggleSave() {
    dispatcher.dispatch({ type: 'TOGGLE_SAVE' });
}

export function updatePlaylist(playlist_data) {
    dispatcher.dispatch({ type: 'UPDATE_PLAYLIST', playlist_data });
}

export function removePlaylist() {
    dispatcher.dispatch({ type: 'REMOVE_PLAYLIST' });
}

export function removedMediaFromPlaylist(media_id, playlist_id) {
    dispatcher.dispatch({ type: 'MEDIA_REMOVED_FROM_PLAYLIST', media_id, playlist_id });
}

export function reorderedMediaInPlaylist(newMediaData) {
    dispatcher.dispatch({ type: 'PLAYLIST_MEDIA_REORDERED', playlist_media: newMediaData });
}
