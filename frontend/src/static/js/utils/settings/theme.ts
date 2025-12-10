type ThemeSettings = {
    mode: 'light' | 'dark';
    switch: { enabled: boolean; position: 'header' | 'sidebar' };
    logo: {
        lightMode: { img: string; svg: string };
        darkMode: { img: string; svg: string };
    };
};

let THEME: ThemeSettings | null = null;

export function init(
    theme?: {
        mode?: ThemeSettings['mode'];
        switch?: Partial<ThemeSettings['switch']>;
    },
    logo?: {
        lightMode?: Partial<ThemeSettings['logo']['lightMode']>;
        darkMode?: Partial<ThemeSettings['logo']['darkMode']>;
    }
) {
    THEME = {
        mode: 'light',
        switch: { enabled: true, position: 'header' },
        logo: { lightMode: { img: '', svg: '' }, darkMode: { img: '', svg: '' } },
    };

    if (theme) {
        if (theme.mode?.trim() === 'dark') {
            THEME.mode = 'dark';
        }

        if (theme.switch) {
            if (theme.switch.enabled === false) {
                THEME.switch.enabled = false;
            }
            if (theme.switch.position?.trim() === 'sidebar') {
                THEME.switch.position = 'sidebar';
            }
        }
    }

    if (logo) {
        if (logo.lightMode) {
            if (logo.lightMode.img) {
                THEME.logo.lightMode.img = logo.lightMode.img.trim();
            }

            if (logo.lightMode.svg) {
                THEME.logo.lightMode.svg = logo.lightMode.svg.trim();
            }
        }

        if (logo.darkMode) {
            if (logo.darkMode.img) {
                THEME.logo.darkMode.img = logo.darkMode.img.trim();
            }

            if (logo.darkMode.svg) {
                THEME.logo.darkMode.svg = logo.darkMode.svg.trim();
            }
        }
    }
}

export function settings() {
    return THEME;
}
