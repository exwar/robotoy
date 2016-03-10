import React, { Component } from 'react';
import { Panel, ButtonInput } from 'react-bootstrap';

const ControlPanel = () => {
  const headerText = <span>Control panel</span>; 

  return <Panel header={headerText} bsStyle="info">
    123
  </Panel>
}

export default ControlPanel;
