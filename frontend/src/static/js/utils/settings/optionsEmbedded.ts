type EmbeddedSettings = {
    video: {
        dimensions: {
            width: number;
            widthUnit: 'px' | 'percent';
            height: number;
            heightUnit: 'px' | 'percent';
        };
    };
};

let EMBEDDED: EmbeddedSettings | null = null;

export function init(settings?: { initialDimensions?: Partial<EmbeddedSettings['video']['dimensions']> }) {
    EMBEDDED = {
        video: {
            dimensions: { width: 560, widthUnit: 'px', height: 315, heightUnit: 'px' },
        },
    };

    if (!settings?.initialDimensions) {
        return;
    }

    const { height, heightUnit, width, widthUnit } = settings.initialDimensions;

    if ('number' === typeof width && !Number.isNaN(width)) {
        EMBEDDED.video.dimensions.width = width;
    }

    if ('number' === typeof height && !Number.isNaN(height)) {
        EMBEDDED.video.dimensions.height = height;
    }

    if (widthUnit?.trim() === 'percent') {
        settings.initialDimensions.widthUnit = 'percent';
    }

    if (heightUnit?.trim() === 'percent') {
        settings.initialDimensions.heightUnit = 'percent';
    }
}

export function settings() {
    return EMBEDDED;
}
