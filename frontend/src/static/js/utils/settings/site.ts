import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let SITE: MediaCMSConfig['site'] | null = null;

export function init(settings?: DeepPartial<GlobalMediaCMS['site']>) {
    SITE = {
        id: settings?.id?.trim() ?? 'media-cms',
        url: settings?.url?.trim() ?? '',
        api: settings?.api?.trim() ?? '',
        title: settings?.title?.trim() ?? '',
        useRoundedCorners: settings?.useRoundedCorners === false ? false : true,
        version: settings?.version?.trim() ?? '1.0.0', // @todo: Validate version format
    };
}

export function settings() {
    return SITE;
}
