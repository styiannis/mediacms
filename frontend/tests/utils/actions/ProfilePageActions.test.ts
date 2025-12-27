import { ProfilePageActions } from '../../../src/static/js/utils/actions';
import { dispatcher } from '../../../src/static/js/utils/dispatcher';

// Mock the dispatcher module used by ProfilePageActions
jest.mock('../../../src/static/js/utils/actions/../dispatcher', () => ({ dispatcher: { dispatch: jest.fn() } }));

describe('utils/actions', () => {
    describe('ProfilePageActions', () => {
        const dispatch = dispatcher.dispatch;

        beforeEach(() => {
            (dispatcher.dispatch as jest.Mock).mockClear();
        });

        it('Should dispatch LOAD_AUTHOR_DATA when load_author_data is called', () => {
            ProfilePageActions.load_author_data();
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_AUTHOR_DATA' });
        });

        it('Should dispatch REMOVE_PROFILE when remove_profile is called', () => {
            ProfilePageActions.remove_profile();
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PROFILE' });
        });

        it('Should not dispatch extra actions for load_author_data', () => {
            ProfilePageActions.load_author_data();
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_AUTHOR_DATA' });
        });

        it('Should not dispatch extra actions for remove_profile', () => {
            ProfilePageActions.remove_profile();
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PROFILE' });
        });

        it('Should allow chaining multiple calls and preserve order', () => {
            ProfilePageActions.load_author_data();
            ProfilePageActions.remove_profile();
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'LOAD_AUTHOR_DATA' });
            expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'REMOVE_PROFILE' });
        });
    });
});
