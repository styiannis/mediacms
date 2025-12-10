type MediaSettings = {
    item: {
        displayAuthor: boolean;
        displayViews: boolean;
        displayPublishDate: boolean;
    };
    share: { options: string[] };
};

let MEDIA: MediaSettings | null = null;

export function init(
    item?: { hideAuthor?: boolean; hideViews?: boolean; hideDate?: boolean },
    shareOptions?: string[]
) {
    MEDIA = {
        item: {
            displayAuthor: item?.hideAuthor === true ? false : true,
            displayViews: item?.hideViews === true ? false : true,
            displayPublishDate: item?.hideDate === true ? false : true,
        },
        share: { options: [] },
    };

    if (shareOptions) {
        const validShareOptions = ['embed', 'email']; // @todo: Check this

        for (const option of shareOptions) {
            const opt = option.trim();
            if (validShareOptions.includes(opt)) {
                MEDIA.share.options.push(opt);
            }
        }
    }
}

export function settings() {
    return MEDIA;
}
