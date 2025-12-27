import React from 'react';
import { render, act } from '@testing-library/react';

// Mocks
jest.useFakeTimers();

// Mock translateString to return input for predictability
jest.mock('../../../src/static/js/utils/helpers', () => ({
    translateString: (s: string) => s,
}));

// Mock global fetch
const fetchMock = jest.fn();
(global as any).fetch = fetchMock;

// Provide a deterministic cookie for CSRF
Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'csrftoken=test-token',
});

import { useBulkActions } from '../../../src/static/js/utils/hooks/useBulkActions';

describe('utils/hooks', () => {
    describe('useBulkActions', () => {
        beforeEach(() => {
            fetchMock.mockReset();
        });

        const TestComp: React.FC<{ capture: (v: any) => void }> = ({ capture }) => {
            const api = useBulkActions();
            React.useEffect(() => capture(api), [capture, api]);
            return null;
        };

        test('selects, deselects, and selects all media correctly', () => {
            let api: any;
            render(<TestComp capture={(v) => (api = v)} />);

            // Initially empty selection
            expect(api.selectedMedia.size).toBe(0);

            // Update available items and select all
            act(() => api.handleItemsUpdate([{ id: 1 }, { uid: 2 }, { friendly_token: 'f3' }]));
            act(() => api.handleSelectAll());
            expect(Array.from(api.selectedMedia)).toEqual(expect.arrayContaining([1, 2, 'f3']));

            // Deselect a specific id
            act(() => api.handleMediaSelection(2, false));
            expect(api.selectedMedia.has(2)).toBe(false);

            // Clear selection
            act(() => api.clearSelection());
            expect(api.selectedMedia.size).toBe(0);
        });

        test('does nothing on bulk action when no selection', () => {
            let api: any;
            render(<TestComp capture={(v) => (api = v)} />);

            act(() => api.handleBulkAction('delete-media'));
            expect(api.showConfirmModal).toBe(false);
            expect(api.confirmMessage).toBe('');
        });

        test('opens confirm modal with correct message for delete-media and proceeds to call API', async () => {
            let api: any;
            render(<TestComp capture={(v) => (api = v)} />);

            // Prepare two selected items
            act(() => api.handleItemsUpdate([{ id: 1 }, { id: 2 }]));
            act(() => api.handleSelectAll());

            act(() => api.handleBulkAction('delete-media'));
            expect(api.showConfirmModal).toBe(true);
            expect(api.confirmMessage).toContain('You are going to delete');

            // Mock fetch success
            fetchMock.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

            await act(async () => {
                api.handleConfirmProceed();
            });

            // Verify fetch parameters
            expect(fetchMock).toHaveBeenCalledWith(
                '/api/v1/media/user/bulk_actions',
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({ 'X-CSRFToken': 'test-token' }),
                })
            );

            // Notification should show and auto-hide after timeout
            expect(api.showNotification).toBe(true);
            act(() => {
                jest.advanceTimersByTime(5000);
            });
            expect(api.showNotification).toBe(false);
        });

        test('handles fetch error for copy-media and shows error notification', async () => {
            let api: any;
            render(<TestComp capture={(v) => (api = v)} />);

            act(() => api.handleItemsUpdate([{ id: 10 }]));
            act(() => api.handleSelectAll());
            act(() => api.handleBulkAction('copy-media'));

            expect(api.showConfirmModal).toBe(true);

            fetchMock.mockResolvedValue({ ok: false });

            await act(async () => {
                api.handleConfirmProceed();
            });

            expect(api.showNotification).toBe(true);
            expect(api.notificationType).toBe('error');
        });

        // @todo: Revisit this behavior
        test('opens and closes non-confirm modals (permissions, playlists, owner, publish, category, tag)', () => {
            let api: any;
            render(<TestComp capture={(v) => (api = v)} />);

            // Prepare two selected items
            act(() => api.handleItemsUpdate([{ id: 1 }, { id: 2 }]));
            act(() => api.handleSelectAll());

            // Permissions - coeditors
            act(() => api.handleBulkAction('add-remove-coeditors'));
            expect(api.showPermissionModal).toBe(true);
            expect(api.permissionType).toBe('editor');
            act(() => api.handlePermissionModalCancel());
            expect(api.showPermissionModal).toBe(false);
            expect(api.permissionType).toBe(null);

            // Playlist
            act(() => api.handleBulkAction('add-remove-playlist'));
            expect(api.showPlaylistModal).toBe(true);
            act(() => api.handlePlaylistModalError('err'));
            expect(api.showPlaylistModal).toBe(false);
            expect(api.notificationType).toBe('error');

            // Change owner
            act(() => api.handleBulkAction('change-owner'));
            expect(api.showChangeOwnerModal).toBe(true);
            act(() => api.handleChangeOwnerModalSuccess('ok'));
            expect(api.showChangeOwnerModal).toBe(false);

            act(() => api.handleSelectAll()); // Need to select again the items

            // Publish state
            act(() => api.handleBulkAction('publish-state'));
            expect(api.showPublishStateModal).toBe(true);
            act(() => api.handlePublishStateModalCancel());
            expect(api.showPublishStateModal).toBe(false);

            // Category
            act(() => api.handleBulkAction('add-remove-category'));
            expect(api.showCategoryModal).toBe(true);
            act(() => api.handleCategoryModalSuccess('ok'));
            expect(api.showCategoryModal).toBe(false);

            act(() => api.handleSelectAll()); // Need to select again the items

            // Tag
            act(() => api.handleBulkAction('add-remove-tags'));
            expect(api.showTagModal).toBe(true);
            act(() => api.handleTagModalCancel());
            expect(api.showTagModal).toBe(false);
        });
    });
});
