import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import ControlPanel from './ControlPanel.jsx';
import Interactive from './Interactive.jsx';
import Programmable from './Programmable.jsx';

import { directions } from '#components/App/constants';

describe ('ControlPanel', function () {
  const position = {
    x: 0,
    y: 0
  };
  const direction = directions.NORTH;
  const mockedFunction = () => {  };

  it('renders without problems', function () {
    const controlPanelTestProps = {
      position: position,
      direction: direction,
      isPlaced: true,
      onPlace: mockedFunction,
      onRotate: mockedFunction,
      onMove: mockedFunction,
      onReset: mockedFunction
    };

    const controlPanel = TestUtils.renderIntoDocument(<ControlPanel
      { ...controlPanelTestProps }
    />);

    expect(controlPanel).toExist();
  });

  it('renders programmable view without problems', function () {
    const interactiveTestProps = {
      position: position,
      direction: direction,
      isPlaced: true,
      onPlaceCoordsDispatch: mockedFunction,
      onRotationDispatch: mockedFunction,
      onMoveDispatch: mockedFunction
    };

    const interactive = TestUtils.renderIntoDocument(<Interactive
      { ...interactiveTestProps }
    />);

    expect(interactive).toExist();
  });

  it('renders interactive view without problems', function () {
    const programmableTestProps = {
      position: position,
      direction: direction,
      isPlaced: true,
      onReset: mockedFunction,
      onPlaceCoordsDispatch: mockedFunction,
      onRotationDispatch: mockedFunction,
      onMoveDispatch: mockedFunction
    };

    const programmable = TestUtils.renderIntoDocument(<Programmable
      { ...programmableTestProps }
    />);

    expect(programmable).toExist();
  });

  it ('performs right coords checking', function () {
    const controlPanelTestProps = {
      position: position,
      direction: direction,
      isPlaced: true,
      onPlace: mockedFunction,
      onRotate: mockedFunction,
      onMove: mockedFunction,
      onReset: mockedFunction
    };

    const controlPanel = TestUtils.renderIntoDocument(<ControlPanel
      { ...controlPanelTestProps }
    />);

    const trueResult = controlPanel.checkCoordExistance(0,0);
    const falseResult = controlPanel.checkCoordExistance(25,25);

    expect(trueResult).toBe(true);
    expect(falseResult).toNotBe(true);
  });
});
