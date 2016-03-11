import React, { Component } from 'react';
import { Row, Col, Panel, Input, Button, ButtonGroup } from 'react-bootstrap';

import styles from './ControlPanel.css'

class ControlPanel extends Component {
  renderControls () {
    const { isPlaced } = this.props;

    return isPlaced ? <Row className="form-group">
      <Col xs={9}>
        <ButtonGroup justified>
          <Button href="#" bsSize="large" onClick={() => this.dispatchRotation(-1)}>
            Left
          </Button>
          <Button href="#" bsSize="large" onClick={() => this.dispatchRotation(1)}>
            Right
          </Button>
        </ButtonGroup>
      </Col>
      <Col xs={3}>
        <Button bsSize="large" bsStyle="primary" block>Move</Button>
      </Col>
    </Row> : null;
  }

  renderOutput () {
    const { isPlaced } = this.props;

    return false ? <Input type="textarea" className={styles.output} standalone readOnly /> : null;
  }

  dispatchPlaceCoords () {
    const { onPlace } = this.props;
    const xCoord = parseInt(this.refs.x.getValue(), 10);
    const yCoord = parseInt(this.refs.y.getValue(), 10);
    const dir = this.refs.dir.getValue().trim();

    if (isNaN(xCoord) || xCoord < 0 || xCoord > 4) return alert(`Wrong X: ${xCoord}`);
    if (isNaN(yCoord) || yCoord < 0 || yCoord > 4) return alert(`Wrong Y: ${yCoord}`);
    if (!dir) return alert('No DIR!');

    onPlace(xCoord, yCoord, dir);
  }

  dispatchRotation (delta) {
    const { direction, onRotate } = this.props;
    const dirs = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentDirIndex = dirs.indexOf(direction);
    let newDirectionIndex = currentDirIndex + delta;

    if (delta < 0 && newDirectionIndex < 0) newDirectionIndex = dirs.length - 1;
    if (delta > 0 && newDirectionIndex >= dirs.length) newDirectionIndex = 0;

    const newDirection = dirs[newDirectionIndex];

    onRotate(newDirection);
  }

  dispatchMove() {
    const { direction, onMove } = this.props;

    switch (direction) {
      case 'NORTH':
        break;
      case 'EAST':
        break;
      case 'SOUTH':
        break;
      case 'WEST':
        break;
    }
  }

  render () {
    const headerText = <span>Control panel</span>;

    return <Panel header={headerText} bsStyle="info">
      <form>
        <Row>
          <Col xs={3}>
            <Input ref="x" type="number" bsSize="large" min="0" max="4" defaultValue="0" placeholder="X" />
          </Col>
          <Col xs={3}>
            <Input ref="y" type="number" bsSize="large" min="0" max="4" defaultValue="0" placeholder="Y" />
          </Col>
          <Col xs={3}>
            <Input ref="dir" type="select" bsSize="large" placeholder="Facing" defaultValue="SOUTH">
              <option value="NORTH">NORTH</option>
              <option value="SOUTH">SOUTH</option>
              <option value="EAST">EAST</option>
              <option value="WEST">WEST</option>
            </Input>
          </Col>
          <Col xs={3}>
            <Button onClick={() => this.dispatchPlaceCoords()} bsStyle="success" bsSize="large" block>Place</Button>
          </Col>
        </Row>

        {this.renderControls()}
        {this.renderOutput()}
      </form>
    </Panel>
  }
}

export default ControlPanel;
