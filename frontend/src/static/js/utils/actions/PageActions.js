import { dispatcher } from '../dispatcher';

export function initPage(page) {
    dispatcher.dispatch({ type: 'INIT_PAGE', page });
}

export function toggleMediaAutoPlay() {
    dispatcher.dispatch({ type: 'TOGGLE_AUTO_PLAY' });
}

export function addNotification(notification, notificationId) {
    dispatcher.dispatch({ type: 'ADD_NOTIFICATION', notification, notificationId });
}
