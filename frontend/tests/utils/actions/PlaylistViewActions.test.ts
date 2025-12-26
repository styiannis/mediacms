import * as PlaylistViewActions from '../../../src/static/js/utils/actions/PlaylistViewActions';

// Mock the dispatcher module used by PlaylistViewActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('PlaylistViewActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('toggleLoop', () => {
        it('Should dispatch TOGGLE_LOOP action', () => {
            PlaylistViewActions.toggleLoop();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LOOP' });
        });

        it('Should dispatch the same payload on repeated calls', () => {
            PlaylistViewActions.toggleLoop();
            PlaylistViewActions.toggleLoop();
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'TOGGLE_LOOP' });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'TOGGLE_LOOP' });
        });
    });

    describe('toggleShuffle', () => {
        it('Should dispatch TOGGLE_SHUFFLE action', () => {
            PlaylistViewActions.toggleShuffle();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SHUFFLE' });
        });

        it('Should not pass extra payload', () => {
            PlaylistViewActions.toggleShuffle();
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SHUFFLE' });
            const callArg = (dispatcher.dispatch as jest.Mock).mock.calls[0][0];
            expect(Object.keys(callArg)).toEqual(['type']);
        });
    });

    describe('toggleSave', () => {
        it('Should dispatch TOGGLE_SAVE action', () => {
            PlaylistViewActions.toggleSave();
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_SAVE' });
        });

        it('Should be stable across multiple invocations', () => {
            for (let i = 0; i < 3; i++) {
                PlaylistViewActions.toggleSave();
            }
            expect((dispatcher.dispatch as jest.Mock).mock.calls.length).toBe(3);
            (dispatcher.dispatch as jest.Mock).mock.calls.forEach(([arg]) =>
                expect(arg).toEqual({ type: 'TOGGLE_SAVE' })
            );
        });
    });
});
