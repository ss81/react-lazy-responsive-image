import React from 'react';
import renderer from 'react-test-renderer';
import LazyResponsiveImage from '../index.js';

it('Rendes successfully the lazy image', () => {
    const tree = renderer
    .create(
        <LazyResponsiveImage
            src="foo@default.jpg"
            className="test-class"
            sources={{
                small: 'foo@small.jpg',
                medium: 'foo@medium.jpg',
                large: 'foo@large.jpg|foo@large-2x.jpg',
            }}
            breakpoints={{
                small: 600,
                medium: 900,
                large: 1200,
            }}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
});