type GlobalMediaCMSApi = {
    actions: string;
    categories: string;
    comments: string;
    history: string;
    liked: string;
    manage_comments: string;
    manage_media: string;
    manage_users: string;
    media: string;
    members: string;
    playlists: string;
    search: string;
    tags: string;
};

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
        mainMenuExtraItems: { text: string; link: string; icon: string; className?: string }[]; // @todo: Check "className"
        navMenuItems: { text: string; link: string; icon: string; className?: string }[]; // @todo: Check "className"
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

type GlobalCMSPages = {
    home: {
        sections: {
            latest: { title: string };
            featured: { title: string };
            recommended: { title: string };
        };
    };
    media: {
        categoriesWithTitle: boolean;
        htmlInDescription: boolean;
        hideViews: boolean;
        related: { initialSize: number };
    };
    profile: {
        htmlInDescription: boolean;
        includeHistory: boolean;
        includeLikedMedia: boolean;
    };
    search: { advancedFilters: boolean };
};

type GlobalCMSSite = {
    api: string;
    devEnv: boolean;
    id: string;
    logo: {
        lightMode: { img: string; svg: string };
        darkMode: { img: string; svg: string };
    };
    pages: {
        featured: { enabled: boolean; title: string };
        latest: { enabled: boolean; title: string };
        members: { enabled: boolean; title: string };
        recommended: { enabled: boolean; title: string };
    };
    taxonomies: {
        categories: { enabled: boolean; title: string };
        tags: { enabled: boolean; title: string };
    };
    theme: {
        mode: 'light' | 'dark';
        switch: { enabled: boolean; position: 'header' | 'sidebar' };
    };
    title: string;
    url: string;
    useRoundedCorners: boolean;
    userPages: {
        history: { enabled: boolean; title: string };
        liked: { enabled: boolean; title: string };
    };
    version: string;
};

type GlobalCMSUrl = {
    addMedia: string; // eg: "./add-media.html";
    admin: string; // eg: "/admin";
    categories: string; // eg: "./categories.html";
    changePassword: string; // eg: "./change-password.html";
    editChannel: string; // eg: "./edit-channel.html";
    editProfile: string; // eg: "./edit-profile.html";
    error404: string; // eg: "./error.html";
    featuredMedia: string; // eg: "./featured.html";
    history: string; // eg: "./history.html";
    home: string; // eg: "./index.html";
    latestMedia: string; // eg: "./latest.html";
    likedMedia: string; // eg: "./liked.html";
    manageComments: string; // eg: "./manage-comments.html";
    manageMedia: string; // eg: "./manage-media.html";
    manageUsers: string; // eg: "./manage-users.html";
    members: string; // eg: "./members.html";
    recommendedMedia: string; // eg: "./recommended.html";
    register: string; // eg: "./register.html";
    search: string; // eg: "./search.html";
    signin: string; // eg: "./signin.html";
    signout: string; // eg: "./signout.html";
    tags: string; // eg: "./tags.html";
};

type GlobalCMSUser = {
    name: string;
    username: string;
    thumbnail: string;
    is: {
        admin: boolean;
        anonymous: boolean;
    };
    can: {
        // a
        addComment: boolean;
        addMedia: boolean;
        // c
        canSeeMembersPage: boolean;
        changePassword: boolean;
        contactUser: boolean;
        // d
        deleteComment: boolean;
        deleteMedia: boolean;
        deleteProfile: boolean;
        // e
        editMedia: boolean;
        editProfile: boolean;
        editSubtitle: boolean;
        // l
        // m
        manageComments: boolean;
        manageMedia: boolean;
        manageUsers: boolean;
        mentionComment: boolean;
        // r
        readComment: boolean;
        // u
        usersNeedsToBeApproved: boolean;
    };
    pages: {
        about: string;
        media: string;
        playlists: string;
    };
};

export type GlobalMediaCMS = {
    api: GlobalMediaCMSApi;
    contents: GlobalMediaCMSContents;
    features: GlobalMediaCMSFeatures;
    pages: GlobalCMSPages;
    site: GlobalCMSSite;
    url: GlobalCMSUrl;
    user: GlobalCMSUser;
};

type MediaCMSConfigApi = {
    archive: {
        tags: string;
        categories: string;
    };
    featured: string;
    manage: {
        media: string;
        users: string;
        comments: string;
    };
    media: string;
    playlists: string;
    recommended: string;
    search: {
        query: string;
        titles: string;
        tag: string;
        category: string;
    };
    user: {
        liked: string;
        history: string;
        playlists: string;
    };
    users: string;
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

type MediaCMSConfigEnabled = Pick<GlobalMediaCMS['site'], 'taxonomies'> & {
    pages: GlobalMediaCMS['site']['pages'] & GlobalMediaCMS['site']['userPages'];
};

type MediaCMSConfigMember = {
    name: GlobalCMSUser['name'] | null;
    username: GlobalCMSUser['username'] | null;
    thumbnail: GlobalCMSUser['thumbnail'] | null;
    is: GlobalCMSUser['is'];
    can: {
        // a
        addComment: boolean;
        addMedia: boolean;
        // c
        canSeeMembersPage: boolean; // @note: This sould be renamed
        changePassword: boolean;
        contactUser: boolean;
        // d
        deleteComment: boolean;
        deleteMedia: boolean;
        deleteProfile: boolean;
        dislikeMedia: boolean;
        downloadMedia: boolean;
        // e
        editMedia: boolean;
        editProfile: boolean;
        editSubtitle: boolean;
        // l
        likeMedia: boolean;
        login: boolean;
        // m
        manageComments: boolean;
        manageMedia: boolean;
        manageUsers: boolean;
        mentionComment: boolean;
        // r
        readComment: boolean;
        register: boolean;
        reportMedia: boolean;
        // s
        saveMedia: boolean;
        shareMedia: boolean;
        // u
        usersNeedsToBeApproved: boolean;
    };
    pages: {
        home: string | null; // @todo: Check this again
        about: GlobalCMSUser['pages']['about'] | null;
        media: GlobalCMSUser['pages']['media'] | null;
        playlists: GlobalCMSUser['pages']['playlists'] | null;
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
    pages: {
        home: GlobalMediaCMS['pages']['home'];
        search: GlobalMediaCMS['pages']['search'];
        media: Omit<GlobalMediaCMS['pages']['media'], 'hideViews'> & {
            displayViews: boolean;
        };
        profile: GlobalMediaCMS['pages']['profile'];
    };
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

type MediaCMSConfigSite = {
    api: string;
    id: string;
    title: string;
    url: string;
    useRoundedCorners: boolean;
    version: string;
};

type MediaCMSConfigTheme = Pick<GlobalMediaCMS['site'], 'logo'> & GlobalMediaCMS['site']['theme'];

type MediaCMSConfigUrl = {
    admin: string; // eg: '/admin'
    archive: {
        categories: string; // eg: './categories.html'
        tags: string; // eg: './tags.html';
    };
    changePassword: string; // eg: './change-password.html';
    embed: string; // eg: 'http://localhost/embed?m=';
    error404: string; // eg: './error.html';
    featured: string; // eg: './featured.html';
    home: string; // eg: './index.html'
    latest: string; // eg: './latest.html';
    manage: {
        comments: string; // eg: './manage-comments.html'
        media: string; // eg: './manage-media.html';
        users: string; // eg: './manage-users.html';
    };
    members: string; // eg: './members.html';
    profile: {
        about: string; // eg: './profile-about.html';
        media: string; // eg: './profile-media.html';
        playlists: string; // eg: './profile-playlists.html';
        shared_by_me: string; // eg: './profile-media.html/shared_by_me';
        shared_with_me: string; // eg: './profile-media.html/shared_with_me';
    };
    recommended: string; // eg: './recommended.html';
    register: string; // eg: './register.html';
    search: {
        base: string; // eg: './search.html';
        category: string; // eg: './search.html?c=';
        query: string; // eg: './search.html?q=';
        tag: string; // eg: './search.html?t=';
    };
    signin: string; // eg: './signin.html';
    signout: string; // eg: './signout.html';
    user: {
        addMedia: string; // eg: './add-media.html';
        editChannel: string; // eg: './edit-channel.html';
        editProfile: string; // eg: './edit-profile.html';
        history: string; // eg: './history.html';
        liked: string; // eg: './liked.html';
    };
};

export type MediaCMSConfig = {
    api: MediaCMSConfigApi;
    contents: MediaCMSConfigContents;
    enabled: MediaCMSConfigEnabled;
    member: MediaCMSConfigMember;
    media: MediaCMSConfigMedia;
    notifications: MediaCMSConfigNotifications;
    options: MediaCMSConfigOptions;
    playlists: MediaCMSConfigPlaylists;
    sidebar: MediaCMSConfigSidebar;
    site: MediaCMSConfigSite;
    theme: MediaCMSConfigTheme;
    url: MediaCMSConfigUrl;
};
