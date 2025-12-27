import store from '../../../src/static/js/utils/stores/ProfilePageStore';

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: jest.fn(() => jest.requireActual('../../tests-constants').sampleMediaCMSConfig),
}));

describe('utils/store', () => {
    describe('ProfilePageStore', () => {
        const handler = store.actions_handler.bind(store);

        const onProfileDelete = jest.fn();
        const onProfileDeleteFail = jest.fn();
        const onLoadAuthorData = jest.fn();

        store.on('profile_delete', onProfileDelete);
        store.on('profile_delete_fail', onProfileDeleteFail);
        store.on('load-author-data', onLoadAuthorData);

        // @todo: Revisit initial values
        test('Validate initial values', () => {
            expect(store.get('author-data')).toBe(null);
            expect(store.get('author-query')).toBe(null);
        });

        describe('Trigger and validate actions behavior', () => {
            // @todo: Continue here...
            test('Action type: "REMOVE_PROFILE"', () => {
                // handler({ type: 'REMOVE_PROFILE' });
            });

            // @todo: Continue here...
            test('Action type: "LOAD_AUTHOR_DATA"', () => {
                // handler({ type: 'LOAD_AUTHOR_DATA' });
            });
        });
    });
});
