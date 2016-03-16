import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Header from './Header.jsx';

describe ('Header', function () {
  it('renders without problems', function () {
    const header = TestUtils.renderIntoDocument(
      <div>
        <Header />
      </div>
    );

    const headerComponent = findDOMNode(header).children[0];

    expect(headerComponent).toExist();
  });
});
