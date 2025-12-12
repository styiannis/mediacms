import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let PAGES: MediaCMSConfig['options']['pages'] | null = null;

export function init(
    home?: DeepPartial<GlobalMediaCMS['pages']['home']>,
    search?: DeepPartial<GlobalMediaCMS['pages']['search']>,
    media?: DeepPartial<GlobalMediaCMS['pages']['media']>,
    profile?: DeepPartial<GlobalMediaCMS['pages']['profile']>,
    VALID_PAGES?: MediaCMSConfig['enabled']['pages']
) {
    PAGES = {
        home: {
            sections: {
                latest: { title: VALID_PAGES?.latest?.title || 'Latest' },
                featured: { title: VALID_PAGES?.featured?.title || 'Featured' },
                recommended: { title: VALID_PAGES?.recommended?.title || 'Recommended' },
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
