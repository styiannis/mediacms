type SidebarSettings = {
    hideHomeLink: boolean;
    hideTagsLink: boolean;
    hideCategoriesLink: boolean;
};

let SIDEBAR: SidebarSettings | null = null;

export function init(settings?: Partial<SidebarSettings>) {
    SIDEBAR = {
        hideHomeLink: settings?.hideHomeLink === true,
        hideTagsLink: settings?.hideTagsLink === true,
        hideCategoriesLink: settings?.hideCategoriesLink === true,
    };
}

export function settings() {
    return SIDEBAR;
}
