import { load_author_data, remove_profile } from '../../../src/static/js/utils/actions/ProfilePageActions';

jest.mock('../../../src/static/js/utils/actions/../dispatcher', () => {
    const dispatch = jest.fn();
    return { dispatcher: { dispatch } };
});

// Re-import after mocking to get the mocked dispatcher reference
import { dispatcher } from '../../../src/static/js/utils/actions/../dispatcher';

describe('ProfilePageActions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch LOAD_AUTHOR_DATA when load_author_data is called', () => {
        load_author_data();
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'LOAD_AUTHOR_DATA' });
    });

    it('should dispatch REMOVE_PROFILE when remove_profile is called', () => {
        remove_profile();
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PROFILE' });
    });

    it('should not dispatch extra actions for load_author_data', () => {
        load_author_data();
        expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'LOAD_AUTHOR_DATA' });
        expect((dispatcher.dispatch as jest.Mock).mock.calls[0][0]).toEqual({ type: 'LOAD_AUTHOR_DATA' });
        expect((dispatcher.dispatch as jest.Mock).mock.calls.length).toBe(1);
    });

    it('should not dispatch extra actions for remove_profile', () => {
        remove_profile();
        expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'REMOVE_PROFILE' });
        expect((dispatcher.dispatch as jest.Mock).mock.calls[0][0]).toEqual({ type: 'REMOVE_PROFILE' });
        expect((dispatcher.dispatch as jest.Mock).mock.calls.length).toBe(1);
    });

    it('should allow chaining multiple calls and preserve order', () => {
        load_author_data();
        remove_profile();
        expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'LOAD_AUTHOR_DATA' });
        expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'REMOVE_PROFILE' });
    });
});
