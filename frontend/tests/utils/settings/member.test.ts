import { memberConfig } from '../../../src/static/js/utils/settings/member';

// Behaviors under test:
// 1) Returns anonymous defaults when user not provided
// 2) Trims user strings and applies user capability booleans when authenticated
// 3) Derives comment capabilities from both user.can and features.media.actions
// 4) Header actions (login/register) reflect headerBar feature flags
// 5) Like/dislike/share/report/download/save reflect media.actions flags with correct defaults
// 6) Handles user flags: canSeeMembersPage, usersNeedsToBeApproved, readComment with proper defaults
// 7) Sets pages.about/media/playlists from user.pages when authenticated and trims whitespace

describe('utils/settings', () => {
    describe('member', () => {
        test('returns anonymous defaults when user not provided', () => {
            const cfg = memberConfig();
            expect(cfg.is).toStrictEqual({ admin: false, anonymous: true });
            expect(cfg.name).toBeNull();
            expect(cfg.username).toBeNull();
            expect(cfg.thumbnail).toBeNull();
            expect(cfg.can.login).toBe(true);
            expect(cfg.can.register).toBe(true);
            expect(cfg.can.addMedia).toBe(false);
            expect(cfg.pages).toStrictEqual({ home: null, about: null, media: null, playlists: null });
        });

        test('trims user strings and applies user capability booleans when authenticated', () => {
            const cfg = memberConfig({
                is: { anonymous: false, admin: true },
                name: ' John Doe ',
                username: ' johnd ',
                thumbnail: ' /img/j.png ',
                can: {
                    changePassword: true,
                    deleteProfile: true,
                    addComment: true,
                    mentionComment: true,
                    deleteComment: true,
                    editMedia: true,
                    deleteMedia: true,
                    editSubtitle: true,
                    manageMedia: true,
                    manageUsers: true,
                    manageComments: true,
                    contactUser: true,
                    addMedia: true,
                    editProfile: true,
                    readComment: true,
                    canSeeMembersPage: true,
                    usersNeedsToBeApproved: false,
                },
                pages: { about: ' /u/john/about ', media: ' /u/john ', playlists: ' /u/john/playlists ' },
            } as any);

            expect(cfg.is).toStrictEqual({ admin: true, anonymous: false });
            expect(cfg.name).toBe('John Doe');
            expect(cfg.username).toBe('johnd');
            expect(cfg.thumbnail).toBe('/img/j.png');
            expect(cfg.can).toMatchObject({
                changePassword: true,
                deleteProfile: true,
                // comment abilities also depend on features; absent features -> false
                addComment: false,
                mentionComment: false,
                deleteComment: true,
                editMedia: true,
                deleteMedia: true,
                editSubtitle: true,
                manageMedia: true,
                manageUsers: true,
                manageComments: true,
                contactUser: true,
                addMedia: true,
                editProfile: true,
                readComment: true,
                canSeeMembersPage: true,
                usersNeedsToBeApproved: false,
            });
            expect(cfg.pages).toMatchObject({
                about: '/u/john/about',
                media: '/u/john',
                playlists: '/u/john/playlists',
            });
        });

        test('comment capabilities require both user.can and features.media.actions', () => {
            // user says allowed, but features disable -> should be false
            const cfg1 = memberConfig(
                { is: { anonymous: false }, can: { addComment: true, mentionComment: true } } as any,
                { media: { actions: { comment: false, comment_mention: true } as any } } as any
            );
            expect(cfg1.can.addComment).toBe(false);
            // mention depends on user.can.mentionComment and features.actions.comment_mention only
            expect(cfg1.can.mentionComment).toBe(true);

            // features enable and user allowed -> true
            const cfg2 = memberConfig(
                { is: { anonymous: false }, can: { addComment: true, mentionComment: true } } as any,
                { media: { actions: { comment: true, comment_mention: true } as any } } as any
            );
            expect(cfg2.can.addComment).toBe(true);
            expect(cfg2.can.mentionComment).toBe(true);
        });

        test('header login/register reflect headerBar feature flags', () => {
            expect(memberConfig(undefined, { headerBar: { hideLogin: true } } as any).can.login).toBe(false);
            expect(memberConfig(undefined, { headerBar: { hideRegister: true } } as any).can.register).toBe(false);
            expect(
                memberConfig(undefined, { headerBar: { hideLogin: false, hideRegister: false } } as any).can
            ).toMatchObject({ login: true, register: true });
        });

        test('media actions flags set like/dislike/share/report/download/save with correct defaults', () => {
            const cfg1 = memberConfig(undefined, {
                media: {
                    actions: { like: false, dislike: false, share: false, report: true, download: true, save: true },
                },
            } as any);
            expect(cfg1.can.likeMedia).toBe(false);
            expect(cfg1.can.dislikeMedia).toBe(false);
            expect(cfg1.can.shareMedia).toBe(false);
            expect(cfg1.can.reportMedia).toBe(true);
            expect(cfg1.can.downloadMedia).toBe(true);
            expect(cfg1.can.saveMedia).toBe(true);

            // Defaults when not provided: like/dislike/share default to true; report/download/save default to false
            const cfg2 = memberConfig();
            expect(cfg2.can.likeMedia).toBe(true);
            expect(cfg2.can.dislikeMedia).toBe(true);
            expect(cfg2.can.shareMedia).toBe(true);
            expect(cfg2.can.reportMedia).toBe(false);
            expect(cfg2.can.downloadMedia).toBe(false);
            expect(cfg2.can.saveMedia).toBe(false);
        });

        test('user flags canSeeMembersPage/usersNeedsToBeApproved/readComment default handling', () => {
            // defaults are true, true, true respectively; allow explicit false
            const cfg1 = memberConfig({
                can: { canSeeMembersPage: false, usersNeedsToBeApproved: false, readComment: false },
            } as any);
            expect(cfg1.can.canSeeMembersPage).toBe(false);
            expect(cfg1.can.usersNeedsToBeApproved).toBe(false);
            expect(cfg1.can.readComment).toBe(false);

            const cfg2 = memberConfig({} as any);
            expect(cfg2.can.canSeeMembersPage).toBe(true);
            expect(cfg2.can.usersNeedsToBeApproved).toBe(true);
            expect(cfg2.can.readComment).toBe(true);
        });
    });
});
