type PagesUrlSettings = {
    home: string; // eg: './index.html'
    admin: string; // eg: '/admin'
    error404: string; // eg: './error.html';
    embed: string; // eg: 'http://localhost/embed?m=';
    latest: string; // eg: './latest.html';
    featured: string; // eg: './featured.html';
    recommended: string; // eg: './recommended.html';
    signin: string; // eg: './signin.html';
    signout: string; // eg: './signout.html';
    register: string; // eg: './register.html';
    changePassword: string; // eg: './change-password.html';
    members: string; // eg: './members.html';
    search: {
        base: string; // eg: './search.html';
        query: string; // eg: './search.html?q=';
        tag: string; // eg: './search.html?t=';
        category: string; // eg: './search.html?c=';
    };
    profile: {
        media: string; // eg: './profile-media.html';
        about: string; // eg: './profile-about.html';
        playlists: string; // eg: './profile-playlists.html';
        shared_by_me: string; // eg: './profile-media.html/shared_by_me';
        shared_with_me: string; // eg: './profile-media.html/shared_with_me';
    };
    user: {
        liked: string; // eg: './liked.html';
        history: string; // eg: './history.html';
        addMedia: string; // eg: './add-media.html';
        editChannel: string; // eg: './edit-channel.html';
        editProfile: string; // eg: './edit-profile.html';
    };
    archive: {
        tags: string; // eg: './tags.html';
        categories: string; // eg: './categories.html'
    };
    manage: {
        media: string; // eg: './manage-media.html';
        users: string; // eg: './manage-users.html';
        comments: string; // eg: './manage-comments.html'
    };
};

let PAGES: PagesUrlSettings | null = null;

export function init(settings: PagesUrlSettings) {
    PAGES = { ...settings }; // @todo: Check this again!
}

export function pages() {
    return PAGES;
}
