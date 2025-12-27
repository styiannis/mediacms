import React from 'react';
import { render } from '@testing-library/react';

// Mock dependencies used by useMediaItem
jest.mock('../../../src/static/js/utils/helpers/', () => ({
    replaceString: (s: string) => s,
    formatInnerLink: (path: string, base: string) => `${base}${path}`,
}));

jest.mock('timeago.js', () => ({
    format: (d: any) => `formatted-${new Date(d).toISOString()}`,
}));

jest.mock('../../../src/static/js/utils/stores/', () => ({
    PageStore: { get: (_: string) => ({ url: 'https://example.com' }) },
}));

jest.mock('../../../src/static/js/components/list-item/includes/items', () => ({
    MediaItemAuthor: ({ name }: any) => <div data-testid="author" data-name={name} />,
    MediaItemAuthorLink: ({ name, link }: any) => (
        <a data-testid="author-link" data-name={name} href={link || undefined} />
    ),
    MediaItemMetaViews: ({ views }: any) => <span data-testid="views" data-views={views} />,
    MediaItemMetaDate: ({ time, dateTime, text }: any) => (
        <time data-testid="date" data-time={String(time)} data-datetime={String(dateTime)}>
            {text}
        </time>
    ),
    MediaItemEditLink: ({ link }: any) => <a data-testid="edit" href={link} />,
    MediaItemViewLink: ({ link }: any) => <a data-testid="view" href={link} />,
}));

// useItem returns titleComponent, descriptionComponent, thumbnailUrl, UnderThumbWrapper
jest.mock('../../../src/static/js/utils/hooks/useItem', () => ({
    useItem: (props: any) => ({
        titleComponent: () => <h3 data-testid="title">{props.title || 'title'}</h3>,
        descriptionComponent: () => <p data-testid="desc">{props.description || 'desc'}</p>,
        thumbnailUrl: props.thumb || 'thumb.jpg',
        UnderThumbWrapper: ({ children }: any) => <div data-testid="under-thumb">{children}</div>,
    }),
}));

import { useMediaItem, itemClassname } from '../../../src/static/js/utils/hooks/useMediaItem';

function HookConsumer(props: any) {
    const [Title, Desc, thumbUrl, UnderThumb, Edit, Meta, View] = useMediaItem(props);
    // The hook returns functions/components/values. To satisfy TS, render using React.createElement
    return (
        <div>
            {typeof Title === 'function' ? React.createElement(Title as any) : null}
            {typeof Desc === 'function' ? React.createElement(Desc as any) : null}
            <div data-testid="thumb">{typeof thumbUrl === 'string' ? thumbUrl : ''}</div>
            {typeof UnderThumb === 'function'
                ? React.createElement(
                      UnderThumb as any,
                      null,
                      typeof Edit === 'function' ? React.createElement(Edit as any) : null,
                      typeof Meta === 'function' ? React.createElement(Meta as any) : null,
                      typeof View === 'function' ? React.createElement(View as any) : null
                  )
                : null}
        </div>
    );
}

describe('utils/hooks', () => {
    describe('useMediaItem', () => {
        test('renders basic components from useItem and edit/view links', () => {
            const props = {
                title: 'My Title',
                description: 'My Desc',
                editLink: '/edit/1',
                link: '/watch/1',
                showSelection: true,
                singleLinkContent: true,
                author_name: 'Author',
                author_link: '/u/author',
                views: 10,
                publish_date: '2020-01-01T00:00:00Z',
            };
            const { getByTestId, queryByTestId } = render(<HookConsumer {...props} />);
            expect(getByTestId('title').textContent).toBe('My Title');
            expect(getByTestId('desc').textContent).toBe('My Desc');
            expect(getByTestId('thumb').textContent).toBe('thumb.jpg');

            expect(getByTestId('edit').getAttribute('href')).toBe('/edit/1');
            // Meta present because hideAllMeta not set
            expect(getByTestId('views').getAttribute('data-views')).toBe('10');
            expect(getByTestId('date')).toBeTruthy();
            expect(getByTestId('view').getAttribute('href')).toBe('/watch/1');
            expect(queryByTestId('author')).toBeTruthy();
        });

        test('view link uses publishLink when provided and showSelection=true', () => {
            const props = {
                editLink: '/edit/2',
                link: '/watch/2',
                publishLink: '/publish/2',
                showSelection: true,
                singleLinkContent: true,
                author_name: 'A',
                author_link: '',
                views: 0,
                publish_date: 0,
            };
            const { getByTestId } = render(<HookConsumer {...props} />);
            expect(getByTestId('view').getAttribute('href')).toBe('/publish/2');
        });

        test('hides author, views, and date based on props', () => {
            const props = {
                editLink: '/e',
                link: '/l',
                showSelection: true,
                hideAuthor: true,
                hideViews: true,
                hideDate: true,
                publish_date: '2020-01-01T00:00:00Z',
                views: 5,
                author_name: 'Hidden',
                author_link: '/u/x',
            };
            const { queryByTestId } = render(<HookConsumer {...props} />);
            expect(queryByTestId('author')).toBeNull();
            expect(queryByTestId('views')).toBeNull();
            expect(queryByTestId('date')).toBeNull();
        });

        test('author link resolves using formatInnerLink and PageStore base url when singleLinkContent=false', () => {
            const props = {
                editLink: '/e',
                link: '/l',
                showSelection: true,
                singleLinkContent: false,
                hideAuthor: false,
                author_name: 'John',
                author_link: '/u/john',
                publish_date: '2020-01-01T00:00:00Z',
            } as any;
            const { container } = render(<HookConsumer {...props} />);
            const a = container.querySelector('[data-testid="author-link"]') as HTMLAnchorElement;
            expect(a).toBeTruthy();
            expect(a.getAttribute('href')).toBe('https://example.com/u/john');
            expect(a.getAttribute('data-name')).toBe('John');
        });

        test('meta wrapper hidden when hideAllMeta=true', () => {
            const props = {
                editLink: '/e',
                link: '/l',
                showSelection: true,
                hideAllMeta: true,
                publish_date: '2020-01-01T00:00:00Z',
            } as any;
            const { queryByTestId } = render(<HookConsumer {...props} />);
            // When metaComponents returns null, none of its children are rendered
            expect(queryByTestId('author')).toBeNull();
            expect(queryByTestId('views')).toBeNull();
            expect(queryByTestId('date')).toBeNull();
        });

        test('itemClassname concatenates inputs correctly', () => {
            expect(itemClassname('base', '', false)).toBe('base');
            expect(itemClassname('base', 'extra', false)).toBe('base extra');
            expect(itemClassname('base', '', true)).toBe('base pl-active-item');
            expect(itemClassname('base', 'extra', true)).toBe('base extra pl-active-item');
        });
    });
});
