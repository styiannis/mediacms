import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let MEDIA: MediaCMSConfig['media'] | null = null;

export function init(
    item?: DeepPartial<GlobalMediaCMS['features']['mediaItem']>,
    shareOptions?: DeepPartial<GlobalMediaCMS['features']['media']['shareOptions']>
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
            if (!option) {
                continue;
            }

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
