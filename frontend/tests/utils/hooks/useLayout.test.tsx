import React from 'react';
import { render } from '@testing-library/react';

import { useLayout } from '../../../src/static/js/utils/hooks/useLayout';
// Mock contexts to avoid importing heavy config dependencies
jest.mock('../../../src/static/js/utils/contexts', () => {
    const React = require('react');
    const ctx = (React as any).createContext(undefined);
    return {
        __esModule: true,
        LayoutContext: ctx,
    };
});

import { LayoutContext } from '../../../src/static/js/utils/contexts';

describe('utils/hooks/useLayout', () => {
    test('returns the current LayoutContext value', () => {
        const provided = { theme: 'dark', sidebarOpen: true } as any;
        let received: any;
        const Comp: React.FC = () => {
            received = useLayout();
            return null;
        };
        render(
            <LayoutContext.Provider value={provided}>
                <Comp />
            </LayoutContext.Provider>
        );
        expect(received).toBe(provided);
    });

    test('updates when LayoutContext value changes across renders', () => {
        const Wrapper: React.FC<{ value: any; children?: React.ReactNode }> = ({ value, children }) => (
            <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
        );
        let values: any[] = [];
        const Comp: React.FC = () => {
            values.push(useLayout());
            return null;
        };
        const { rerender } = render(
            <Wrapper value={{ theme: 'light' }}>
                <Comp />
            </Wrapper>
        );
        rerender(
            <Wrapper value={{ theme: 'dark' }}>
                <Comp />
            </Wrapper>
        );
        expect(values[0]).toEqual({ theme: 'light' });
        expect(values[1]).toEqual({ theme: 'dark' });
    });

    test('returns undefined when used without a Provider (default context value)', () => {
        let received: any = 'init';
        const Comp: React.FC = () => {
            received = useLayout();
            return null;
        };
        render(<Comp />);
        expect(received).toBeUndefined();
    });

    test('works with complex objects and functions inside context value', () => {
        const toggle = jest.fn();
        const provided = { theme: 'light', toggle } as any;
        let received: any;
        const Comp: React.FC = () => {
            received = useLayout();
            return null;
        };
        render(
            <LayoutContext.Provider value={provided}>
                <Comp />
            </LayoutContext.Provider>
        );
        expect(received).toBe(provided);
        expect(received.toggle).toBe(toggle);
        received.toggle();
        expect(toggle).toHaveBeenCalledTimes(1);
    });

    test('multiple consumers read the same provided value instance', () => {
        const provided = { theme: 'light' } as any;
        let a: any;
        let b: any;
        const A: React.FC = () => {
            a = useLayout();
            return null;
        };
        const B: React.FC = () => {
            b = useLayout();
            return null;
        };
        render(
            <LayoutContext.Provider value={provided}>
                <A />
                <B />
            </LayoutContext.Provider>
        );
        expect(a).toBe(provided);
        expect(b).toBe(provided);
    });
});
