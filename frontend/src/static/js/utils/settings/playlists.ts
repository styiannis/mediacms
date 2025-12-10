type PlaylistsSettings = {
    mediaTypes: ('audio' | 'video')[];
};

let PLAYLISTS: PlaylistsSettings | null = null;

export function init(settings?: Partial<PlaylistsSettings>) {
    PLAYLISTS = { mediaTypes: [] };

    if (Array.isArray(settings?.mediaTypes)) {
        for (const mtype of settings.mediaTypes) {
            if (mtype === 'audio' || mtype === 'video') {
                PLAYLISTS.mediaTypes.push(mtype);
            }
        }
    }

    if (PLAYLISTS.mediaTypes.length === 0) {
        PLAYLISTS.mediaTypes = ['audio', 'video'];
    }
}

export function settings() {
    return PLAYLISTS;
}
