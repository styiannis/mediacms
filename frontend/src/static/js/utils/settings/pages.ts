type PageKey = 'latest' | 'featured' | 'recommended' | 'members' | 'liked' | 'history';
type PageSettings = { enabled: boolean; title: string };
type PagesSettings = Record<PageKey, PageSettings>;

let PAGES: PagesSettings | null = null;

export function init(settings?: Partial<Record<PageKey, Partial<PageSettings>>>) {
    PAGES = {
        latest: { enabled: false, title: 'Recent uploads' },
        featured: { enabled: false, title: 'Featured' },
        recommended: { enabled: false, title: 'Recommended' },
        members: { enabled: false, title: 'Members' },
        liked: { enabled: false, title: 'Liked media' },
        history: { enabled: false, title: 'History' },
    };

    // @todo: Similar code in `taxonomies.ts`
    for (let sk in settings) {
        const key = sk as keyof typeof settings;

        if (PAGES[key] === undefined) {
            continue;
        }

        PAGES[key].enabled = settings[key]?.enabled === false ? false : true;

        if (settings[key]?.title !== undefined) {
            PAGES[key].title = settings[key].title.trim();
        }
    }
}

export function settings() {
    return PAGES;
}
