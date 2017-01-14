import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';


it('renders the app root correctly', () => {
    const tree = renderer.create(
        <App />
    );
    expect(tree).toMatchSnapshot();
});
