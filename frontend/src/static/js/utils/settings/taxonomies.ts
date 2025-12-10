type TaxonomyKey = 'tags' | 'categories';
type TaxonomySettings = { enabled: boolean; title: string };
type TaxonomiesSettings = Record<TaxonomyKey, TaxonomySettings>;

let TAXONOMIES: TaxonomiesSettings | null = null;

export function init(settings?: Partial<Record<TaxonomyKey, Partial<TaxonomySettings>>>) {
    TAXONOMIES = {
        tags: { enabled: false, title: 'Tags' },
        categories: { enabled: false, title: 'Categories' },
    };

    for (let sk in settings) {
        const key = sk as keyof typeof settings;

        if (TAXONOMIES[key] === undefined) {
            continue;
        }

        TAXONOMIES[key].enabled = settings[key]?.enabled === false ? false : true; // @todo: Check this again

        if (settings[key]?.title !== undefined) {
            TAXONOMIES[key].title = settings[key].title.trim();
        }
    }
}

export function settings() {
    return TAXONOMIES;
}
