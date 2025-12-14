// check templates/config/installation/translations.html for more

declare global {
    interface Window {
        TRANSLATION?: Record<string, string>;
    }
}

export const translateString = (word: string) => window.TRANSLATION?.[word] ?? word;
