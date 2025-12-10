type TaxonomiesSettings = {
    tags: { enabled: boolean; title: string };
    categories: { enabled: boolean; title: string };
};

let TAXONOMIES: TaxonomiesSettings | null = null;

export function init(settings?: Partial<TaxonomiesSettings>) {
    TAXONOMIES = {
        tags: { enabled: false, title: 'Tags' },
        categories: { enabled: false, title: 'Categories' },
    };

    for (let sk in settings) {
        const key = sk as keyof typeof settings;

        if (TAXONOMIES[key] === undefined) {
            continue;
        }

        TAXONOMIES[key].enabled = settings[key]?.enabled === false ? false : true;

        if (settings[key]?.title !== undefined) {
            TAXONOMIES[key].title = settings[key].title.trim();
        }
    }
}

export function settings() {
    return TAXONOMIES;
}
