import React from 'react';
import { useBulkActions } from '../hooks/useBulkActions';

/**
 * Higher-Order Component that provides bulk actions functionality
 * to class components via props
 */
export function withBulkActions<P extends { bulkActions: ReturnType<typeof useBulkActions> }>(
    WrappedComponent: React.FC<P>
) {
    return function WithBulkActionsComponent(props: P) {
        const bulkActions = useBulkActions();
        return <WrappedComponent {...props} bulkActions={bulkActions} />;
    };
}
