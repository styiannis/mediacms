import * as PageActions from '../../../src/static/js/utils/actions/PageActions';
import { dispatcher } from '../../../src/static/js/utils/dispatcher';

// Mock the dispatcher module used by PageActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({ dispatcher: { dispatch: jest.fn() } }));

describe('utils/actions', () => {
    describe('PageActions', () => {
        const dispatch = dispatcher.dispatch;

        beforeEach(() => {
            (dispatcher.dispatch as jest.Mock).mockClear();
        });

        describe('initPage', () => {
            it('Should dispatch INIT_PAGE with provided page string', () => {
                PageActions.initPage('home');
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: 'home' });
            });

            // @todo: Revisit this behavior
            it('Should allow empty string as page and still dispatch', () => {
                PageActions.initPage('');
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: '' });
            });

            it('Should handle long page names', () => {
                const longPage = 'p'.repeat(500);
                PageActions.initPage(longPage);
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'INIT_PAGE', page: longPage });
            });
        });

        describe('toggleMediaAutoPlay', () => {
            it('Should dispatch TOGGLE_AUTO_PLAY action', () => {
                PageActions.toggleMediaAutoPlay();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_AUTO_PLAY' });
            });

            it('Should be idempotent for multiple calls', () => {
                PageActions.toggleMediaAutoPlay();
                PageActions.toggleMediaAutoPlay();
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'TOGGLE_AUTO_PLAY' });
                expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'TOGGLE_AUTO_PLAY' });
            });
        });

        describe('addNotification', () => {
            it('Should dispatch ADD_NOTIFICATION with message and id', () => {
                const notification = 'Saved!';
                const notificationId = 'notif-1';
                PageActions.addNotification(notification, notificationId);
                expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_NOTIFICATION', notification, notificationId });
            });

            // @todo: Revisit this behavior
            it('Should support empty notification message', () => {
                const notification = '';
                const notificationId = 'id-empty';
                PageActions.addNotification(notification, notificationId);
                expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_NOTIFICATION', notification, notificationId });
            });

            it('Should support long notification ids', () => {
                const notification = 'Msg';
                const notificationId = 'x'.repeat(256);
                PageActions.addNotification(notification, notificationId);
                expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_NOTIFICATION', notification, notificationId });
            });
        });
    });
});
