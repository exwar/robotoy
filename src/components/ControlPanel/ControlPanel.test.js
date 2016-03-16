import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import ControlPanel from './ControlPanel.jsx';
import Interactive from './Interactive.jsx';
import Programmable from './Programmable.jsx';

describe ('ControlPanel', function () {
  it('renders without problems', function () {
    const controlPanel = TestUtils.renderIntoDocument(<ControlPanel />);

    expect(controlPanel).toExist();
  });

  it('renders programmable view without problems', function () {
    const interactive = TestUtils.renderIntoDocument(<Interactive />);

    expect(interactive).toExist();
  });

  it('renders interactive view without problems', function () {
    const programmable = TestUtils.renderIntoDocument(<Programmable />);

    expect(programmable).toExist();
  });

  it ('performs right coords checking', function () {
    const controlPanel = TestUtils.renderIntoDocument(<ControlPanel />);

    const trueResult = controlPanel.checkCoordExistance(0,0);
    const falseResult = controlPanel.checkCoordExistance(25,25);

    expect(trueResult).toBe(true);
    expect(falseResult).toNotBe(true);
  });
});
