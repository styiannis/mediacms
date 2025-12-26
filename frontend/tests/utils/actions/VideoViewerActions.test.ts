import * as VideoViewerActions from '../../../src/static/js/utils/actions/VideoViewerActions';

// Mock the dispatcher module used by VideoViewerActions
jest.mock('../../../src/static/js/utils/dispatcher', () => ({
    dispatcher: { dispatch: jest.fn() },
}));

import { dispatcher } from '../../../src/static/js/utils/dispatcher';

describe('VideoViewerActions', () => {
    beforeEach(() => {
        (dispatcher.dispatch as jest.Mock).mockClear();
    });

    describe('set_viewer_mode', () => {
        it('Should dispatch SET_VIEWER_MODE with true when enabling theater mode', () => {
            VideoViewerActions.set_viewer_mode(true);
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_VIEWER_MODE', inTheaterMode: true });
        });

        it('Should dispatch SET_VIEWER_MODE with false when disabling theater mode', () => {
            VideoViewerActions.set_viewer_mode(false);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_VIEWER_MODE', inTheaterMode: false });
        });
    });

    describe('set_player_volume', () => {
        it('Should dispatch SET_PLAYER_VOLUME with provided volume number', () => {
            VideoViewerActions.set_player_volume(0.75);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_PLAYER_VOLUME', playerVolume: 0.75 });
        });

        it('Should dispatch SET_PLAYER_VOLUME with 0 and 1 bounds as-is', () => {
            VideoViewerActions.set_player_volume(0);
            VideoViewerActions.set_player_volume(1);
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, { type: 'SET_PLAYER_VOLUME', playerVolume: 0 });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, { type: 'SET_PLAYER_VOLUME', playerVolume: 1 });
        });
    });

    describe('set_player_sound_muted', () => {
        it('Should dispatch SET_PLAYER_SOUND_MUTED with true', () => {
            VideoViewerActions.set_player_sound_muted(true);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'SET_PLAYER_SOUND_MUTED',
                playerSoundMuted: true,
            });
        });

        it('Should dispatch SET_PLAYER_SOUND_MUTED with false', () => {
            VideoViewerActions.set_player_sound_muted(false);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: 'SET_PLAYER_SOUND_MUTED',
                playerSoundMuted: false,
            });
        });
    });

    describe('set_video_quality', () => {
        it("Should dispatch SET_VIDEO_QUALITY with 'auto'", () => {
            VideoViewerActions.set_video_quality('auto');
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_VIDEO_QUALITY', quality: 'auto' });
        });

        it('Should dispatch SET_VIDEO_QUALITY with numeric quality', () => {
            VideoViewerActions.set_video_quality(720 as any);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_VIDEO_QUALITY', quality: 720 });
        });
    });

    describe('set_video_playback_speed', () => {
        it('Should dispatch SET_VIDEO_PLAYBACK_SPEED with provided speed', () => {
            VideoViewerActions.set_video_playback_speed(1.5);
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: 'SET_VIDEO_PLAYBACK_SPEED', playbackSpeed: 1.5 });
        });

        it('Should dispatch again for different speeds', () => {
            VideoViewerActions.set_video_playback_speed(0.5);
            VideoViewerActions.set_video_playback_speed(2);
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(1, {
                type: 'SET_VIDEO_PLAYBACK_SPEED',
                playbackSpeed: 0.5,
            });
            expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, {
                type: 'SET_VIDEO_PLAYBACK_SPEED',
                playbackSpeed: 2,
            });
        });
    });
});
