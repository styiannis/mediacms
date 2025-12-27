import store from '../../../src/static/js/utils/stores/SearchFieldStore';

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn(() => jest.requireActual('../../tests-constants').sampleMediaCMSConfig),
}));

describe('utils/store', () => {
    describe('SearchFieldStore', () => {
        const handler = store.actions_handler.bind(store);

        const onLoadPredictions = jest.fn();

        store.on('load_predictions', onLoadPredictions);

        // @todo: Revisit initial values
        test('Validate initial values', () => {
            expect(store.get('search-query')).toBe('');
            expect(store.get('search-categories')).toBe('');
            expect(store.get('search-tags')).toBe('');
        });

        describe('Trigger and validate actions behavior', () => {
            // @todo: Continue here...
            test('Action type: "REQUEST_PREDICTIONS"', () => {
                // handler({ type: 'REQUEST_PREDICTIONS', query: 'search-query-search' });
            });
        });
    });
});
