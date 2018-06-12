import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import App from './App.jsx';

describe ('App', function () {
  it('renders without problems', function () {
    const app = TestUtils.renderIntoDocument(<App />);

    expect(app).toExist();
  });
});
