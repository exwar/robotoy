import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import TableTop from './TableTop.jsx';
import styles from './TableTop.css';
import { directions } from '#components/App/constants';

describe ('TableTop', function () {
  it('renders without problems', function () {
    const tableTop = TestUtils.renderIntoDocument(<TableTop />);

    expect(tableTop).toExist();
  });

  it('renders unit with robot', function () {
    const tableTopTestProps = {
      position: {
        x: 0,
        y: 0
      },
      direction: directions.SOUTH,
      isPlaced: true
    };

    const tableTop = TestUtils.renderIntoDocument(<TableTop
      { ...tableTopTestProps }
    />);

    const targetCell = TestUtils.findRenderedDOMComponentWithClass(tableTop, styles.unit_active);

    expect(targetCell).toExist();
  });
});
