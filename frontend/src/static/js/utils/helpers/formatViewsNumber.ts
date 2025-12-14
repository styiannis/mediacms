export function formatViewsNumber(views_number: number, fullNumber: boolean) {
    function formattedValue(val: number, lim: number, unit: string) {
        return Number((val / lim).toFixed(val < 10 * lim ? 1 : 0)) + unit;
    }

    function format(i: number, views: number, mult: number, compare: number, limit: number, units: string[]) {
        while (views >= compare) {
            limit *= mult;
            compare *= mult;
            i += 1;
        }
        return i < units.length
            ? formattedValue(views, limit, units[i])
            : formattedValue(views * (mult * (i - (units.length - 1))), limit, units[units.length - 1]);
    }

    return fullNumber
        ? views_number.toLocaleString()
        : format(0, views_number, 1000, 1000, 1, ['', 'K', 'M', 'B', 'T']);
}
