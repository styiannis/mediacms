import React from 'react';
import { render } from '@testing-library/react';

// Reuse popup mocks as in usePopup tests to avoid SCSS/component side-effects
jest.mock('../../../src/static/js/components/_shared/popup/Popup.jsx', () => {
    const React = require('react');
    const Popup = React.forwardRef((props: any, _ref: any) => React.createElement('div', props, props.children));
    return { __esModule: true, default: Popup };
});

jest.mock('../../../src/static/js/components/_shared/popup/PopupContent.jsx', () => ({
    PopupContent: (props: any) => React.createElement('div', props, props.children),
}));

jest.mock('../../../src/static/js/components/_shared/popup/PopupTrigger.jsx', () => ({
    PopupTrigger: (props: any) => React.createElement('div', props, props.children),
}));

import { useMediaFilter } from '../../../src/static/js/utils/hooks/useMediaFilter';

function HookConsumer({ initial }: { initial: string }) {
    const tuple = useMediaFilter(initial) as [
        React.RefObject<any>,
        string,
        React.Dispatch<React.SetStateAction<string>>,
        React.RefObject<any>,
        any,
        any,
    ];
    const containerRef = tuple[0];
    const value = tuple[1];
    const setValue = tuple[2];
    const popupContentRef = tuple[3];
    const PopupContent = tuple[4];
    const PopupTrigger = tuple[5];
    // Render structure to assert behavior
    return (
        <div>
            <div data-testid="container-ref">{containerRef && typeof containerRef === 'object' ? 'ok' : 'bad'}</div>
            <div data-testid="value">{String(value)}</div>
            <button data-testid="set" onClick={() => (setValue as any)('updated')} />
            <div data-testid="popup-ref">{popupContentRef && typeof popupContentRef === 'object' ? 'ok' : 'bad'}</div>
            {typeof PopupContent === 'function'
                ? React.createElement(PopupContent as any, { 'data-testid': 'pc' }, 'c')
                : null}
            {typeof PopupTrigger === 'function'
                ? React.createElement(PopupTrigger as any, { 'data-testid': 'pt' }, 't')
                : null}
        </div>
    );
}

describe('utils/hooks/useMediaFilter', () => {
    test('Returns a 6-tuple in expected order', () => {
        let tuple: any;
        const Comp: React.FC = () => {
            tuple = useMediaFilter('init');
            return null;
        };
        render(<Comp />);
        expect(Array.isArray(tuple)).toBe(true);
        expect(tuple).toHaveLength(6);
        const [containerRef, value, setValue, popupContentRef, PopupContent, PopupTrigger] = tuple;
        expect(containerRef).toBeDefined();
        expect(value).toBe('init');
        expect(typeof setValue).toBe('function');
        expect(popupContentRef).toBeDefined();
        expect(typeof PopupContent).toBe('function');
        expect(typeof PopupTrigger).toBe('function');
    });

    test('Initial value is respected and can be updated via setter', () => {
        const { getByTestId } = render(<HookConsumer initial="first" />);
        expect(getByTestId('value').textContent).toBe('first');
        (getByTestId('set') as HTMLButtonElement).click();
        expect(getByTestId('value').textContent).toBe('updated');
    });

    test('containerRef and popupContentRef are mutable ref objects', () => {
        let data: any;
        const Comp: React.FC = () => {
            data = useMediaFilter('x');
            return null;
        };
        render(<Comp />);
        const [containerRef, _value, _setValue, popupContentRef] = data;
        expect(containerRef).toHaveProperty('current');
        expect(popupContentRef).toHaveProperty('current');
        expect(containerRef.current).toBe(null);
        expect(popupContentRef.current).toBe(null);
    });

    test('PopupContent and PopupTrigger are stable functions', () => {
        let first: any;
        let second: any;
        const First: React.FC = () => {
            first = useMediaFilter('a');
            return null;
        };
        const Second: React.FC = () => {
            second = useMediaFilter('b');
            return null;
        };
        const Parent: React.FC = () => (
            <>
                <First />
                <Second />
            </>
        );
        render(<Parent />);
        const [, , , , PopupContent1, PopupTrigger1] = first;
        const [, , , , PopupContent2, PopupTrigger2] = second;
        expect(typeof PopupContent1).toBe('function');
        expect(typeof PopupTrigger1).toBe('function');
        expect(PopupContent1).toBe(PopupContent2);
        expect(PopupTrigger1).toBe(PopupTrigger2);
    });

    test('Returned popup components can be rendered without errors', () => {
        const { getByTestId } = render(<HookConsumer initial="val" />);
        expect(getByTestId('pc')).toBeTruthy();
        expect(getByTestId('pt')).toBeTruthy();
    });
});
