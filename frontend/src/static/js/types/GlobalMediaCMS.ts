type GlobalMediaCMSContents = {
    header: {
        right: string;
        onLogoRight: string;
    };
    notifications: {
        messages: {
            addToLiked: string;
            removeFromLiked: string;
            addToDisliked: string;
            removeFromDisliked: string;
        };
    };
    sidebar: {
        belowNavMenu: string;
        belowThemeSwitcher: string;
        footer: string;
        mainMenuExtraItems: { text: string; link: string; icon: string; className?: string }[];
        navMenuItems: { text: string; link: string; icon: string; className?: string }[];
    };
    uploader: {
        belowUploadArea: string;
        postUploadMessage: string;
    };
};

type GlobalMediaCMSFeatures = {
    embeddedVideo: {
        initialDimensions: {
            width: number;
            height: number;
        };
    };
    headerBar: {
        hideLogin: boolean;
        hideRegister: boolean;
    };
    sideBar: {
        hideHomeLink: boolean;
        hideTagsLink: boolean;
        hideCategoriesLink: boolean;
    };
    media: {
        actions: {
            share: boolean;
            report: boolean;
            like: boolean;
            dislike: boolean;
            download: boolean;
            comment: boolean;
            comment_mention: boolean;
            save: boolean;
        };
        shareOptions: ('embed' | 'email')[];
    };
    mediaItem: {
        hideDate: boolean;
        hideViews: boolean;
        hideAuthor: boolean;
    };
    playlists: {
        mediaTypes: ('audio' | 'video')[];
    };
};

export type GlobalMediaCMS = {
    contents: GlobalMediaCMSContents;
    features: GlobalMediaCMSFeatures;
};

type MediaCMSConfigContents = Omit<GlobalMediaCMSContents, 'notifications' | 'sidebar'> & {
    sidebar: {
        belowNavMenu: GlobalMediaCMSContents['sidebar']['belowNavMenu'];
        belowThemeSwitcher: GlobalMediaCMSContents['sidebar']['belowThemeSwitcher'];
        footer: GlobalMediaCMSContents['sidebar']['footer'];
        mainMenuExtra: { items: GlobalMediaCMSContents['sidebar']['mainMenuExtraItems'] };
        navMenu: { items: GlobalMediaCMSContents['sidebar']['navMenuItems'] };
    };
};

type MediaCMSConfigMedia = {
    item: {
        displayAuthor: boolean;
        displayViews: boolean;
        displayPublishDate: boolean;
    };
    share: { options: string[] };
};

type MediaCMSConfigNotifications = GlobalMediaCMSContents['notifications'];

type MediaCMSConfigOptions = {
    // pages: optionsPages.settings(),  // @todo
    embedded: {
        video: {
            dimensions: {
                width: number;
                widthUnit: 'px';
                // widthUnit: 'px' | 'percent'; // @note: The unit value "percent" is not used
                height: number;
                heightUnit: 'px';
                // heightUnit: 'px' | 'percent'; // @note: The unit value "percent" is not used
            };
        };
    };
};

type MediaCMSConfigPlaylists = GlobalMediaCMSFeatures['playlists'];

type MediaCMSConfigSidebar = GlobalMediaCMSFeatures['sideBar'];

export type MediaCMSConfig = {
    contents: MediaCMSConfigContents;
    media: MediaCMSConfigMedia;
    notifications: MediaCMSConfigNotifications;
    options: MediaCMSConfigOptions;
    playlists: MediaCMSConfigPlaylists;
    sidebar: MediaCMSConfigSidebar;
};
