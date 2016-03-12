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
        <Button bsSize="large" bsStyle="primary" onClick={() => this.dispatchMove()} block>Move</Button>
      </Col>
    </Row> : null;
  }

  renderOutput () {
    const { isPlaced } = this.props;

    return false ? <Input type="textarea" className={styles.output} standalone readOnly /> : null;
  }

  checkCoordExistance (x, y) {
    let isError = false;

    isError = isError || (isNaN(x) || x < 0 || x > 4)
    isError = isError || (isNaN(y) || y < 0 || y > 4)

    if (isError) {
      alert('Coords are out of tabletop');
    }

    return !isError;
  }

  dispatchPlaceCoords () {
    const { onPlace } = this.props;
    const xCoord = parseInt(this.refs.x.getValue(), 10);
    const yCoord = parseInt(this.refs.y.getValue(), 10);
    const dir = this.refs.dir.getValue().trim();

    if (this.checkCoordExistance(xCoord, yCoord)) {
      onPlace(xCoord, yCoord, dir);
    }
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
    const { position, direction, onMove } = this.props;
    const newCoords = { ...position };

    switch (direction) {
      case 'NORTH':
        newCoords.y = newCoords.y + 1;
        break;
      case 'EAST':
        newCoords.x = newCoords.x + 1;
        break;
      case 'SOUTH':
        newCoords.y = newCoords.y - 1;
        break;
      case 'WEST':
        newCoords.x = newCoords.x - 1;
        break;
    }

    if (this.checkCoordExistance(newCoords.x, newCoords.y)) {
      onMove(newCoords);
    };
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
