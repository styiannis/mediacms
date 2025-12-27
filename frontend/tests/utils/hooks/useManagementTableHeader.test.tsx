import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useManagementTableHeader } from '../../../src/static/js/utils/hooks/useManagementTableHeader';

function HookConsumer(props: any) {
    const [sort, order, isSelected, sortByColumn, checkAll] = useManagementTableHeader(props);
    return (
        <div>
            <div data-testid="sort">{String(sort)}</div>
            <div data-testid="order">{String(order)}</div>
            <div data-testid="selected">{String(isSelected)}</div>
            <button id="title" data-testid="col-title" onClick={(e) => sortByColumn(e as any)} />
            <button id="views" data-testid="col-views" onClick={(e) => sortByColumn(e as any)} />
            <button data-testid="check-all" onClick={() => checkAll()} />
        </div>
    );
}

describe('utils/hooks', () => {
    describe('useManagementTableHeader', () => {
        test('Returns a 5-tuple in expected order and reflects initial props', () => {
            let tuple: any;
            const Comp: React.FC = () => {
                tuple = useManagementTableHeader({ sort: 'title', order: 'asc', selected: false });
                return null;
            };
            render(<Comp />);
            expect(Array.isArray(tuple)).toBe(true);
            expect(tuple).toHaveLength(5);
            const [sort, order, isSelected] = tuple;
            expect(sort).toBe('title');
            expect(order).toBe('asc');
            expect(isSelected).toBe(false);
        });

        test('sortByColumn toggles order when clicking same column and updates sort when clicking different column', () => {
            const onClickColumnSort = jest.fn();
            const { getByTestId, rerender } = render(
                <HookConsumer sort="title" order="desc" selected={false} onClickColumnSort={onClickColumnSort} />
            );
            // Initial state
            expect(getByTestId('sort').textContent).toBe('title');
            expect(getByTestId('order').textContent).toBe('desc');

            // Click same column -> toggle order to asc
            fireEvent.click(getByTestId('col-title'));
            expect(onClickColumnSort).toHaveBeenLastCalledWith('title', 'asc');
            // UI reflects new state after click
            // Rerender to ensure state settled in testing DOM
            rerender(<HookConsumer sort="title" order="desc" selected={false} onClickColumnSort={onClickColumnSort} />);

            // Click different column -> set sort to that column and default order desc
            fireEvent.click(getByTestId('col-views'));
            expect(onClickColumnSort).toHaveBeenLastCalledWith('views', 'desc');
        });

        test('checkAll inverts current selection and invokes callback with newSelected and type', () => {
            const onCheckAllRows = jest.fn();
            const { getByTestId } = render(
                <HookConsumer sort="title" order="asc" selected={false} type="media" onCheckAllRows={onCheckAllRows} />
            );
            expect(getByTestId('selected').textContent).toBe('false');
            fireEvent.click(getByTestId('check-all'));
            // newSelected computed as !isSelected -> true
            expect(onCheckAllRows).toHaveBeenCalledWith(true, 'media');
        });

        test('Effects update internal state when props change', () => {
            const { getByTestId, rerender } = render(<HookConsumer sort="title" order="asc" selected={false} />);
            expect(getByTestId('sort').textContent).toBe('title');
            expect(getByTestId('order').textContent).toBe('asc');
            expect(getByTestId('selected').textContent).toBe('false');

            rerender(<HookConsumer sort="views" order="desc" selected={true} />);
            expect(getByTestId('sort').textContent).toBe('views');
            expect(getByTestId('order').textContent).toBe('desc');
            expect(getByTestId('selected').textContent).toBe('true');
        });

        test('Does not throw when optional callbacks are not provided', () => {
            const { getByTestId } = render(<HookConsumer sort="x" order="desc" selected={false} />);
            expect(() => fireEvent.click(getByTestId('col-title'))).not.toThrow();
            expect(() => fireEvent.click(getByTestId('check-all'))).not.toThrow();
        });
    });
});
