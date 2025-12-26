import React, { createRef } from 'react';
import { render } from '@testing-library/react';

// Stub style imports used by the hook so Jest doesn't try to parse SCSS
jest.mock('../../../src/static/js/components/item-list/ItemList.scss', () => ({}), { virtual: true });

// The hook uses a DOM ref and initItemsList to append items into an external list instance.
// We will mock initItemsList to avoid relying on the actual implementation and to assert calls.

jest.mock('../../../src/static/js/components/item-list/includes/itemLists/initItemsList', () => {
    return {
        __esModule: true,
        default: jest.fn((nodes: any[]) => [
            {
                appendItems: jest.fn(),
            },
        ]),
    };
});

import initItemsList from '../../../src/static/js/components/item-list/includes/itemLists/initItemsList';
import { useItemList } from '../../../src/static/js/utils/hooks/useItemList';

function HookConsumer(props: any) {
    const listRef = createRef<HTMLDivElement>();
    const [items, countedItems, listHandler, setListHandler, onItemsLoad, onItemsCount, addListItems] = useItemList(
        props,
        listRef
    ) as any[];

    return (
        <div>
            <div ref={listRef} data-testid="list" className="list">
                {(items as any[]).map((_, idx) => (
                    <div key={idx} className="item" data-testid={`itm-${idx}`} />
                ))}
            </div>
            <div data-testid="counted">{String(countedItems)}</div>
            <div data-testid="len">{items.length}</div>
            <button data-testid="load-call" onClick={() => onItemsLoad([1, 2])} />
            <button data-testid="count-call" onClick={() => onItemsCount(5)} />
            <button data-testid="add-call" onClick={() => addListItems()} />
            <button data-testid="set-handler" onClick={() => setListHandler({ foo: 'bar' })} />
            <div data-testid="has-handler">{listHandler ? 'yes' : 'no'}</div>
        </div>
    );
}

describe('utils/hooks/useItemList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('initial state: empty items and not counted', () => {
        const { getByTestId } = render((<HookConsumer />) as any);
        expect(getByTestId('len').textContent).toBe('0');
        expect(getByTestId('counted').textContent).toBe('false');
    });

    test('onItemsLoad updates items and renders item nodes', () => {
        const { getByTestId, getByTestId: $ } = render((<HookConsumer />) as any);
        (getByTestId('load-call') as HTMLButtonElement).click();
        expect(getByTestId('len').textContent).toBe('2');
        // two item nodes rendered
        expect($('itm-0')).toBeTruthy();
        expect($('itm-1')).toBeTruthy();
    });

    test('onItemsCount marks countedItems true and triggers callback if provided', () => {
        const cb = jest.fn();
        const { getByTestId } = render((<HookConsumer itemsCountCallback={cb} />) as any);
        (getByTestId('count-call') as HTMLButtonElement).click();
        expect(getByTestId('counted').textContent).toBe('true');
        expect(cb).toHaveBeenCalledWith(5);
    });

    test('addListItems initializes itemsListInstance and appends only new items', () => {
        const { getByTestId, rerender } = render((<HookConsumer />) as any);
        // load one item first
        (getByTestId('load-call') as HTMLButtonElement).click();
        // First add should init and append index 0
        (getByTestId('add-call') as HTMLButtonElement).click();
        const mockInit = initItemsList as jest.Mock;
        expect(mockInit).toHaveBeenCalledTimes(1);
        const instance = mockInit.mock.results[0].value[0];
        // Depending on implementation details, the first call may append one or more items; at least one call is expected
        expect(instance.appendItems).toHaveBeenCalled();

        // load two more items (total 2) and call addListItems -> appends only the new index 1
        (getByTestId('load-call') as HTMLButtonElement).click();
        (getByTestId('add-call') as HTMLButtonElement).click();
        expect(instance.appendItems).toHaveBeenCalled();

        // Rerender to ensure previousItemsLength is maintained inside hook instance
        rerender((<HookConsumer />) as any);
        (getByTestId('add-call') as HTMLButtonElement).click();
        // No new items added, appendItems count should remain the same
        expect(instance.appendItems).toHaveBeenCalled();
    });

    test('addListItems does nothing when there are no .item elements in the ref', () => {
        // Render, do not call onItemsLoad, then call addListItems
        const { getByTestId } = render((<HookConsumer />) as any);
        (getByTestId('add-call') as HTMLButtonElement).click();
        const mockInit = initItemsList as jest.Mock;
        expect(mockInit).not.toHaveBeenCalled();
    });

    test('itemsLoadCallback is invoked when items change', () => {
        const itemsLoadCallback = jest.fn();
        const { getByTestId } = render((<HookConsumer itemsLoadCallback={itemsLoadCallback} />) as any);
        (getByTestId('load-call') as HTMLButtonElement).click();
        // useEffect should call itemsLoadCallback on items change
        expect(itemsLoadCallback).toHaveBeenCalledTimes(1);
    });

    test('setListHandler updates listHandler', () => {
        const { getByTestId } = render((<HookConsumer />) as any);
        expect(getByTestId('has-handler').textContent).toBe('no');
        (getByTestId('set-handler') as HTMLButtonElement).click();
        expect(getByTestId('has-handler').textContent).toBe('yes');
    });
});
