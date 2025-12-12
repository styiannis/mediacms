import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let TAXONOMIES: MediaCMSConfig['enabled']['taxonomies'] | null = null;

export function init(settings?: DeepPartial<GlobalMediaCMS['site']['taxonomies']>) {
    TAXONOMIES = {
        tags: { enabled: false, title: 'Tags' },
        categories: { enabled: false, title: 'Categories' },
    };

    for (let sk in settings) {
        const key = sk as keyof typeof settings;

        if (!TAXONOMIES[key]) {
            continue;
        }

        TAXONOMIES[key].enabled = settings[key]?.enabled === false ? false : true; // @todo: Check this again

        if (settings[key]?.title !== undefined) {
            TAXONOMIES[key].title = settings[key].title.trim();
        }
    }
}

export function settings() {
    return TAXONOMIES;
}
