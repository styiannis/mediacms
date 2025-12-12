import { MediaCMSConfig } from '../../types';

let PAGES: MediaCMSConfig['url'] | null = null;

// @todo: Check this
export function init(settings: MediaCMSConfig['url']) {
    PAGES = { ...settings };
}

export function pages() {
    return PAGES;
}
