import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let EMBEDDED: MediaCMSConfig['options']['embedded'] | null = null;

export function init(settings?: DeepPartial<GlobalMediaCMS['features']['embeddedVideo']>) {
    EMBEDDED = {
        video: {
            dimensions: {
                width: 560,
                widthUnit: 'px',
                height: 315,
                heightUnit: 'px',
            },
        },
    };

    if (!settings?.initialDimensions) {
        return;
    }

    const {
        height,
        width,
        // heightUnit,  // @note: It doesn't used
        // widthUnit    // @note: It doesn't used
    } = settings.initialDimensions;

    if ('number' === typeof width && !Number.isNaN(width)) {
        EMBEDDED.video.dimensions.width = width;
    }

    if ('number' === typeof height && !Number.isNaN(height)) {
        EMBEDDED.video.dimensions.height = height;
    }

    // @note: It doesn't used
    // if (widthUnit?.trim() === 'percent') {
    //     settings.initialDimensions.widthUnit = 'percent';
    // }

    // @note: It doesn't used
    // if (heightUnit?.trim() === 'percent') {
    //     settings.initialDimensions.heightUnit = 'percent';
    // }
}

export function settings() {
    return EMBEDDED;
}
