import React from 'react';
import { render, act } from '@testing-library/react';

jest.mock('../../../src/static/js/utils/settings/config', () => ({
    config: () => ({
        member: {
            is: { anonymous: false },
            username: 'mock',
            thumbnail: null,
            can: {
                addComment: false,
                addMedia: false,
                canSeeMembersPage: false,
                changePassword: false,
                contactUser: false,
                deleteComment: false,
                deleteMedia: false,
                deleteProfile: false,
                deleteUser: false,
                editChannel: false,
                editComment: false,
                editMedia: false,
                editProfile: false,
                editUser: false,
                featureMedia: false,
                likeMedia: false,
                linkUser: false,
                moderateMedia: false,
                publishMedia: false,
                rateMedia: false,
                reportMedia: false,
                reviewReport: false,
                seeAllMedia: false,
                seeUnlistedMedia: false,
                usersNeedsToBeApproved: false,
            },
            pages: { home: null, about: null, media: null, playlists: null },
        },
    }),
}));

import { useUser } from '../../../src/static/js/utils/hooks/useUser';
import { UserContext } from '../../../src/static/js/utils/contexts/UserContext';

// Minimal test utility to render a test component that uses the hook
function getRenderers(value: any) {
    const data: { current: any } = { current: undefined };
    const Comp: React.FC = () => {
        data.current = useUser();
        return null;
    };
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
    return { Comp, wrapper, data };
}

describe('utils/hooks/useUser', () => {
    function fullUserValue(overrides: Partial<any> = {}) {
        return {
            isAnonymous: false,
            username: 'user',
            thumbnail: null,
            userCan: {
                addComment: false,
                addMedia: false,
                canSeeMembersPage: false,
                changePassword: false,
                contactUser: false,
                deleteComment: false,
                deleteMedia: false,
                deleteProfile: false,
                deleteUser: false,
                editChannel: false,
                editComment: false,
                editMedia: false,
                editProfile: false,
                editUser: false,
                featureMedia: false,
                likeMedia: false,
                linkUser: false,
                moderateMedia: false,
                publishMedia: false,
                rateMedia: false,
                reportMedia: false,
                reviewReport: false,
                seeAllMedia: false,
                seeUnlistedMedia: false,
                usersNeedsToBeApproved: false,
                ...((overrides as any).userCan || {}),
            },
            pages: { home: null, about: null, media: null, playlists: null },
            ...overrides,
        };
    }

    test('returns context value provided by UserContext', () => {
        const ctx = fullUserValue({ username: 'anon', isAnonymous: true });
        const { Comp, wrapper, data } = getRenderers(ctx);
        render(<Comp />, { wrapper });
        expect(data.current).toBe(ctx);
    });

    test('reflects updates when provider value changes between renders', async () => {
        const initial = fullUserValue({ username: 'guest', isAnonymous: true });
        const next = fullUserValue({ username: 'john', isAnonymous: false, thumbnail: 't.png', userCan: { editMedia: true } });

        const data: { current: any } = { current: undefined };
        const Inner: React.FC = () => {
            data.current = useUser();
            return null;
        };
        const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
            const [value, setValue] = React.useState(initial);
            (window as any).__setUserCtx = setValue;
            return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
        };
        render(<Inner />, { wrapper: Wrapper });
        expect(data.current).toEqual(initial);
        await act(async () => {
            (window as any).__setUserCtx(next);
        });
        expect(data.current).toEqual(next);
    });

    test('exposes user permissions object (userCan) as-is', () => {
        const perms = { editMedia: true, deleteMedia: false, addMedia: true };
        const ctx = fullUserValue({ userCan: perms });
        const { Comp, wrapper, data } = getRenderers(ctx);
        render(<Comp />, { wrapper });
        expect(data.current.userCan).toBe(perms);
        expect(data.current.userCan.editMedia).toBe(true);
        expect(data.current.userCan.deleteMedia).toBe(false);
    });

    test('works with expected value shape', () => {
        const minimal = fullUserValue({ username: 'x' });
        const { Comp, wrapper, data } = getRenderers(minimal);
        render(<Comp />, { wrapper });
        expect(data.current).toEqual(minimal);
    });

    test('can be consumed inside a component and expose correct attributes', () => {
        const ctx = fullUserValue({ username: 'comp', isAnonymous: false });
        const Comp: React.FC = () => {
            const user = useUser();
            return <div data-username={user.username} data-anon={String(user.isAnonymous)} />;
        };
        const { container } = render(<Comp />, { wrapper: ({ children }: any) => (
            <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
        ) });
        const div = container.querySelector('div')!;
        expect(div.getAttribute('data-username')).toBe('comp');
        expect(div.getAttribute('data-anon')).toBe('false');
    });
});
