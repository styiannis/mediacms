import { dispatcher } from '../dispatcher';

export function requestPredictions(query) {
    dispatcher.dispatch({ type: 'REQUEST_PREDICTIONS', query });
}
