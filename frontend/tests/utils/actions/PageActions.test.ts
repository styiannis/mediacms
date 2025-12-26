import * as PageActions from '../../../src/static/js/utils/actions/PageActions';

// Mock the dispatcher module used by PageActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('PageActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('initPage', () => {
        it('Should dispatch INIT_PAGE with provided page string', () => {
            PageActions.initPage('home');
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: 'home' });
        });

        it('Should allow empty string as page and still dispatch', () => {
            PageActions.initPage('');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: '' });
        });

        it('Should handle long page names', () => {
            const longPage = 'p'.repeat(500);
            PageActions.initPage(longPage);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: longPage });
        });
    });

    describe('toggleMediaAutoPlay', () => {
        it('Should dispatch TOGGLE_AUTO_PLAY action', () => {
            PageActions.toggleMediaAutoPlay();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_AUTO_PLAY' });
        });

        it('Should be idempotent in terms of dispatch payload (no args)', () => {
            PageActions.toggleMediaAutoPlay();
            PageActions.toggleMediaAutoPlay();
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'TOGGLE_AUTO_PLAY' });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'TOGGLE_AUTO_PLAY' });
        });
    });

    describe('addNotification', () => {
        it('Should dispatch ADD_NOTIFICATION with message and id', () => {
            PageActions.addNotification('Saved!', 'notif-1');
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'ADD_NOTIFICATION',
                notification: 'Saved!',
                notificationId: 'notif-1',
            });
        });

        it('Should support empty notification message', () => {
            PageActions.addNotification('', 'id-empty');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'ADD_NOTIFICATION',
                notification: '',
                notificationId: 'id-empty',
            });
        });

        it('Should support long notification ids', () => {
            const id = 'x'.repeat(256);
            PageActions.addNotification('Msg', id);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'ADD_NOTIFICATION',
                notification: 'Msg',
                notificationId: id,
            });
        });
    });
});
