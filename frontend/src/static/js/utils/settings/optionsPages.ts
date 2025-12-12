import { type PagesSettings } from './pages';

type OptionsPagesSettings = {
    home: {
        sections: {
            latest: { title: string };
            featured: { title: string };
            recommended: { title: string };
        };
    };
    search: { advancedFilters: boolean };
    media: {
        categoriesWithTitle: boolean;
        htmlInDescription: boolean;
        displayViews: boolean;
        related: { initialSize: number };
    };
    profile: {
        htmlInDescription: boolean;
        includeHistory: boolean;
        includeLikedMedia: boolean;
    };
};

let PAGES: OptionsPagesSettings | null = null;

export function init(
    home?: { sections?: Partial<OptionsPagesSettings['home']['sections']> },
    search?: Partial<OptionsPagesSettings['search']>,
    media?: Partial<Omit<OptionsPagesSettings['media'], 'displayViews' | 'related'>> & {
        hideViews?: boolean;
        related?: { initialSize?: number };
    },
    profile?: Partial<OptionsPagesSettings['profile']>,
    VALID_PAGES?: PagesSettings
) {
    PAGES = {
        home: {
            sections: {
                latest: { title: VALID_PAGES?.latest.title || 'Latest' },
                featured: { title: VALID_PAGES?.featured.title || 'Featured' },
                recommended: { title: VALID_PAGES?.recommended.title || 'Recommended' },
            },
        },
        search: {
            advancedFilters: search?.advancedFilters === true,
        },
        media: {
            categoriesWithTitle: media?.categoriesWithTitle === true,
            htmlInDescription: media?.htmlInDescription === true,
            displayViews: media?.hideViews === true ? false : true,
            related: {
                initialSize:
                    'number' === typeof media?.related?.initialSize && !Number.isNaN(media.related.initialSize)
                        ? media.related.initialSize
                        : 10,
            },
        },
        profile: {
            htmlInDescription: profile?.htmlInDescription === true,
            includeHistory: profile?.includeHistory === true,
            includeLikedMedia: profile?.includeLikedMedia === true,
        },
    };

    if (home?.sections) {
        if (home.sections.latest?.title) {
            PAGES.home.sections.latest.title = home.sections.latest.title.trim();
        }

        if (home.sections.featured?.title) {
            PAGES.home.sections.featured.title = home.sections.featured.title.trim();
        }

        if (home.sections.recommended?.title) {
            PAGES.home.sections.recommended.title = home.sections.recommended.title.trim();
        }
    }
}

export function settings() {
    return PAGES;
}
