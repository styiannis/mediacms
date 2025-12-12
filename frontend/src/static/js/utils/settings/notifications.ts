import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let NOTIFICATIONS: MediaCMSConfig['notifications'] | null = null;

export function init(settings?: DeepPartial<GlobalMediaCMS['contents']['notifications']>) {
    NOTIFICATIONS = {
        messages: {
            addToLiked: 'Added to liked media',
            removeFromLiked: 'Removed from liked media',
            addToDisliked: 'Added to disliked media',
            removeFromDisliked: 'Removed from disliked media',
        },
    };

    if (!settings?.messages) {
        return;
    }

    const entries = Object.entries(settings.messages) as [keyof typeof settings.messages, string][];

    for (const [key, value] of entries) {
        const message = value?.trim();
        if (message) {
            NOTIFICATIONS.messages[key] = message;
        }
    }
}

export function settings() {
    return NOTIFICATIONS;
}
