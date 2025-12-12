type ContentsSettings = {
    header: {
        right: string;
        onLogoRight: string;
    };
    sidebar: {
        belowNavMenu: string;
        belowThemeSwitcher: string;
        footer: string;
        mainMenuExtra: { items: { text: string; link: string; icon: string; className?: string }[] };
        navMenu: { items: { text: string; link: string; icon: string; className?: string }[] };
    };
    uploader: {
        belowUploadArea: string;
        postUploadMessage: string;
    };
};

let CONTENTS: ContentsSettings | null = null;

function headerContents(settings?: Partial<ContentsSettings['header']>) {
    const header: ContentsSettings['header'] = {
        right: settings?.right !== undefined ? settings.right.trim() : '',
        onLogoRight: settings?.onLogoRight !== undefined ? settings.onLogoRight.trim() : '',
    };
    return header;
}

function sidebarContents(settings?: {
    belowNavMenu?: ContentsSettings['sidebar']['belowNavMenu'];
    belowThemeSwitcher?: ContentsSettings['sidebar']['belowThemeSwitcher'];
    footer?: ContentsSettings['sidebar']['footer'];
    mainMenuExtraItems?: ContentsSettings['sidebar']['mainMenuExtra']['items'];
    navMenuItems?: ContentsSettings['sidebar']['navMenu']['items'];
}) {
    const sidebar: ContentsSettings['sidebar'] = {
        belowNavMenu: settings?.belowNavMenu ? settings.belowNavMenu.trim() : '',
        belowThemeSwitcher: settings?.belowThemeSwitcher ? settings.belowThemeSwitcher.trim() : '',
        footer: settings?.footer ? settings.footer.trim() : '',
        mainMenuExtra: { items: [] },
        navMenu: { items: [] },
    };

    if (settings?.mainMenuExtraItems) {
        for (const item of settings.mainMenuExtraItems) {
            const text = item.text ? item.text.trim() : '';
            const link = item.link ? item.link.trim() : '';
            const icon = item.icon ? item.icon.trim() : '';

            const className = item.className ? item.className.trim() : '';

            if (text && link && icon) {
                sidebar.mainMenuExtra.items.push({ text, link, icon, className });
            }
        }
    }

    if (settings?.navMenuItems) {
        for (const item of settings.navMenuItems) {
            const text = item.text ? item.text.trim() : '';
            const link = item.link ? item.link.trim() : '';
            const icon = item.icon ? item.icon.trim() : '';

            const className = item.className ? item.className.trim() : '';

            if (text && link && icon) {
                sidebar.navMenu.items.push({ text, link, icon, className });
            }
        }
    }

    return sidebar;
}

function uploaderContents(settings?: Partial<ContentsSettings['uploader']>) {
    const uploader: ContentsSettings['uploader'] = {
        belowUploadArea: settings?.belowUploadArea ? settings?.belowUploadArea.trim() : '',
        postUploadMessage: settings?.postUploadMessage ? settings?.postUploadMessage.trim() : '',
    };
    return uploader;
}

export function init(settings?: {
    header: Partial<ContentsSettings['header']>;
    sidebar: Partial<ContentsSettings['sidebar']>;
    uploader: Partial<ContentsSettings['uploader']>;
}) {
    CONTENTS = {
        header: headerContents(settings?.header),
        sidebar: sidebarContents(settings?.sidebar),
        uploader: uploaderContents(settings?.uploader),
    };
}

export function settings() {
    return CONTENTS;
}
