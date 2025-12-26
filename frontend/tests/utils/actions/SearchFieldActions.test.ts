import * as SearchFieldActions from '../../../src/static/js/utils/actions/SearchFieldActions';

// Mock the dispatcher module used by SearchFieldActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('SearchFieldActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('requestPredictions', () => {
        it('Should dispatch REQUEST_PREDICTIONS with provided query string', () => {
            SearchFieldActions.requestPredictions('cats');
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REQUEST_PREDICTIONS', query: 'cats' });
        });

        it('Should dispatch even with empty string query', () => {
            SearchFieldActions.requestPredictions('');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REQUEST_PREDICTIONS', query: '' });
        });

        it('Should handle long query strings', () => {
            const longQuery = 'q'.repeat(1024);
            SearchFieldActions.requestPredictions(longQuery);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REQUEST_PREDICTIONS', query: longQuery });
        });

        it('Should accept whitespace-only query as-is (no trimming in action)', () => {
            const q = '   ';
            SearchFieldActions.requestPredictions(q);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REQUEST_PREDICTIONS', query: q });
        });

        it('Should preserve special characters in query', () => {
            const special = 'c++ regex (test)? [a-z]{1,3}';
            SearchFieldActions.requestPredictions(special);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REQUEST_PREDICTIONS', query: special });
        });
    });
});
