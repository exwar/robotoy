import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import TableTop from './TableTop.jsx';

describe ('TableTop', function () {
  it('renders without problems', function () {
    const tableTop = TestUtils.renderIntoDocument(<TableTop />);

    expect(tableTop).toExist();
  });
});
