import { PlaylistViewActions } from '../../../src/static/js/utils/actions';
import { dispatcher } from '../../../src/static/js/utils/dispatcher';

// Mock the dispatcher module used by PlaylistViewActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({ dispatcher: { dispatch: jest.fn() } }));

describe('utils/actions', () => {
    describe('PlaylistViewActions', () => {
        const dispatch = dispatcher.dispatch;

        beforeEach(() => {
            (dispatcher.dispatch as jest.Mock).mockClear();
        });

        describe('toggleLoop', () => {
            it('Should dispatch TOGGLE_LOOP action', () => {
                PlaylistViewActions.toggleLoop();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LOOP' });
            });

            it('Should dispatch the same payload on repeated calls', () => {
                PlaylistViewActions.toggleLoop();
                PlaylistViewActions.toggleLoop();
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'TOGGLE_LOOP' });
                expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'TOGGLE_LOOP' });
            });
        });

        describe('toggleShuffle', () => {
            it('Should dispatch TOGGLE_SHUFFLE action', () => {
                PlaylistViewActions.toggleShuffle();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SHUFFLE' });
            });
        });

        describe('toggleSave', () => {
            it('Should dispatch TOGGLE_SAVE action', () => {
                PlaylistViewActions.toggleSave();
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SAVE' });
            });

            it('Should be stable across multiple invocations', () => {
                for (let i = 0; i < 3; i++) {
                    PlaylistViewActions.toggleSave();
                }
                expect(dispatch).toHaveBeenCalledTimes(3);
                (dispatch as jest.Mock).mock.calls.forEach(([arg]) => expect(arg).toEqual({ type: 'TOGGLE_SAVE' }));
            });
        });
    });
});
