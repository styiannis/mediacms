import { dispatcher } from '../dispatcher';

export default function (store, handler) {
    dispatcher.register(store[handler].bind(store));
    return store;
}
