import urlParse from 'url-parse'; // @todo: It doesn't really need

type EndpointsSettings = {
    media: string;
    featured: string;
    recommended: string;
    playlists: string;
    users: string;
    user: {
        liked: string;
        history: string;
        playlists: string;
    };
    archive: {
        tags: string;
        categories: string;
    };
    manage: {
        media: string;
        users: string;
        comments: string;
    };
    search: {
        query: string;
        titles: string;
        tag: string;
        category: string;
    };
};

let ENDPOINTS: EndpointsSettings | null = null;

function formatEndpoints<K extends string = string>(baseUrl: string, endpoints: Record<K, string>) {
    for (let k in endpoints) {
        endpoints[k] = baseUrl + '/' + endpoints[k].replace(/^\//g, '');
    }
    return endpoints;
}

export function init(
    base_url: string,
    endpoints: {
        media: string;
        playlists: string;
        comments: string;
        search: string;
        tags: string;
        categories: string;
        members: string;
        liked: string;
        history: string;
        actions: string;
        manage_media: string;
        manage_users: string;
        manage_comments: string;
    }
) {
    const baseUrl = urlParse(base_url).toString().replace(/\/+$/, '');

    ENDPOINTS = {
        ...formatEndpoints(baseUrl, {
            media: endpoints.media,
            featured: endpoints.media + '?show=featured',
            recommended: endpoints.media + '?show=recommended',
            playlists: endpoints.playlists,
            users: endpoints.members,
        }),
        user: formatEndpoints(baseUrl, {
            liked: endpoints.liked,
            history: endpoints.history,
            playlists: endpoints.playlists + '?author=',
        }),
        archive: formatEndpoints(baseUrl, {
            tags: endpoints.tags,
            categories: endpoints.categories,
        }),
        manage: formatEndpoints(baseUrl, {
            media: endpoints.manage_media,
            users: endpoints.manage_users,
            comments: endpoints.manage_comments,
        }),
        search: formatEndpoints(baseUrl, {
            query: endpoints.search + '?q=',
            titles: endpoints.search + '?show=titles&q=',
            tag: endpoints.search + '?t=',
            category: endpoints.search + '?c=',
        }),
    };
}

export function endpoints() {
    return ENDPOINTS;
}
