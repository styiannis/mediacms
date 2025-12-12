import { DeepPartial, GlobalMediaCMS, MediaCMSConfig } from '../../types';

let MEMBER: MediaCMSConfig['member'] | null = null;

export function init(
    user?: DeepPartial<GlobalMediaCMS['user']>,
    features?: {
        headerBar?: DeepPartial<GlobalMediaCMS['features']['headerBar']>;
        media?: { actions?: DeepPartial<GlobalMediaCMS['features']['media']['actions']> };
    }
) {
    MEMBER = {
        name: null,
        username: null,
        thumbnail: null,
        is: { admin: false, anonymous: true },
        can: {
            login: true,
            register: true,
            addMedia: false,
            editProfile: false,
            canSeeMembersPage: true,
            usersNeedsToBeApproved: true,
            changePassword: true,
            deleteProfile: false,
            readComment: true,
            addComment: false,
            mentionComment: false,
            deleteComment: false,
            editMedia: false,
            deleteMedia: false,
            editSubtitle: false,
            manageMedia: false,
            manageUsers: false,
            manageComments: false,
            reportMedia: false,
            downloadMedia: false,
            saveMedia: false,
            likeMedia: true,
            dislikeMedia: true,
            shareMedia: true,
            contactUser: false,
        },
        pages: { home: null, about: null, media: null, playlists: null },
    };

    if (user) {
        MEMBER.is.anonymous = user.is?.anonymous === false ? false : true;

        if (!MEMBER.is.anonymous) {
            MEMBER.is.admin = user.is?.admin === true;

            MEMBER.name = (user.name ? user.name.trim() : null) || null;
            MEMBER.username = (user.username ? user.username.trim() : null) || null;
            MEMBER.thumbnail = (user.thumbnail ? user.thumbnail.trim() : null) || null;
            MEMBER.can.changePassword = user.can?.changePassword === false ? false : true;

            MEMBER.can.deleteProfile = user.can?.deleteProfile === true;
            MEMBER.can.addComment = user.can?.addComment === true;
            MEMBER.can.mentionComment = user.can?.mentionComment === true;
            MEMBER.can.deleteComment = user.can?.deleteComment === true;
            MEMBER.can.editMedia = user.can?.editMedia === true;
            MEMBER.can.deleteMedia = user.can?.deleteMedia === true;
            MEMBER.can.editSubtitle = user.can?.editSubtitle === true;
            MEMBER.can.manageMedia = user.can?.manageMedia === true;
            MEMBER.can.manageUsers = user.can?.manageUsers === true;
            MEMBER.can.manageComments = user.can?.manageComments === true;
            MEMBER.can.contactUser = user.can?.contactUser === true;

            MEMBER.pages.about = (user.pages?.about ? user.pages.about.trim() : null) || null;
            MEMBER.pages.media = (user.pages?.media ? user.pages.media.trim() : null) || null;
            MEMBER.pages.playlists = (user.pages?.playlists ? user.pages.playlists.trim() : null) || null;
        }

        MEMBER.can.canSeeMembersPage = user.can?.canSeeMembersPage === false ? false : true;
        MEMBER.can.usersNeedsToBeApproved = user.can?.usersNeedsToBeApproved === false ? false : true;
        MEMBER.can.addMedia = user.can?.addMedia === true;
        MEMBER.can.editProfile = user.can?.editProfile === true;
        MEMBER.can.readComment = user.can?.readComment === false ? false : true;
    }

    MEMBER.can.addComment = MEMBER.can.addComment && features?.media?.actions?.comment === true;
    MEMBER.can.mentionComment = MEMBER.can.mentionComment && features?.media?.actions?.comment_mention === true;

    MEMBER.can.likeMedia = features?.media?.actions?.like === false ? false : true;
    MEMBER.can.dislikeMedia = features?.media?.actions?.dislike === false ? false : true;
    MEMBER.can.reportMedia = features?.media?.actions?.report === true;

    MEMBER.can.downloadMedia = features?.media?.actions?.download === true;
    MEMBER.can.saveMedia = features?.media?.actions?.save === true;
    MEMBER.can.shareMedia = features?.media?.actions?.share === false ? false : true;

    MEMBER.can.login = features?.headerBar?.hideLogin === true ? false : true;
    MEMBER.can.register = features?.headerBar?.hideRegister === true ? false : true;
}

export function settings() {
    return MEMBER;
}
