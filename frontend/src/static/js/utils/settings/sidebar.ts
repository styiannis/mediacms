import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let SIDEBAR: MediaCMSConfig['sidebar'] | null = null;

export function init(settings?: DeepPartial<GlobalMediaCMS['features']['sideBar']>) {
    SIDEBAR = {
        hideHomeLink: settings?.hideHomeLink === true,
        hideTagsLink: settings?.hideTagsLink === true,
        hideCategoriesLink: settings?.hideCategoriesLink === true,
    };
}

export function settings() {
    return SIDEBAR;
}
