import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Input, Button, ButtonGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import Interactive from '#components/ControlPanel/Interactive.jsx';
import Programmable from '#components/ControlPanel/Programmable.jsx';

import { directions, inputways } from '#components/App/constants';

import styles from './ControlPanel.css';

class ControlPanel extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    direction: PropTypes.oneOf([
      directions.NORTH,
      directions.SOUTH,
      directions.EAST,
      directions.WEST
    ]).isRequired,
    isPlaced: PropTypes.bool.isRequired,
    onPlace: PropTypes.func.isRequired,
    onRotate: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
  }

  state = {
    way: inputways.INTERACTIVE
  }

  checkCoordExistance (x, y) {
    let isError = false;

    isError = isError || (isNaN(x) || x < 0 || x > 4);
    isError = isError || (isNaN(y) || y < 0 || y > 4);

    if (isError) {
      NotificationManager.warning(`{x:${x}, y:${y}}`, 'Coordinates are out of tabletop');
    }

    return !isError;
  }

  dispatchPlaceCoords (x, y, direction) {
    const { onPlace } = this.props;
    const intX = parseInt(x, 10);
    const intY = parseInt(y, 10);

    if (this.checkCoordExistance(intX, intY)) {
      onPlace(intX, intY, direction);
    }
  }

  dispatchRotation (delta) {
    const { direction, onRotate } = this.props;
    const dirs = [directions.NORTH, directions.EAST, directions.SOUTH, directions.WEST];
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
      case directions.NORTH:
        newCoords.y = newCoords.y + 1;
        break;
      case directions.EAST:
        newCoords.x = newCoords.x + 1;
        break;
      case directions.SOUTH:
        newCoords.y = newCoords.y - 1;
        break;
      case directions.WEST:
        newCoords.x = newCoords.x - 1;
        break;
    }

    if (this.checkCoordExistance(newCoords.x, newCoords.y)) {
      onMove(newCoords);
    };
  }

  toggleInputWay (event, wayType) {
    const { onReset } = this.props;

    onReset();

    this.setState({
      way: wayType
    });

    event.preventDefault();
  }

  render () {
    const { position, direction, isPlaced, onReset } = this.props;
    const { way } = this.state;
    const headerText = <span>Control panel</span>;

    return <Panel header={headerText} bsStyle="info">
      <Row className="form-group">
        <Col xs={12}>
          <ButtonGroup justified>
            <Button
              href="#"
              onClick={(event) => this.toggleInputWay(event, inputways.INTERACTIVE)}
              active={way === inputways.INTERACTIVE}
            >Interactive</Button>
            <Button
              href="#"
              onClick={(event) => this.toggleInputWay(event, inputways.PROGRAMMABLE)}
              active={way === inputways.PROGRAMMABLE}
            >Programmable</Button>
          </ButtonGroup>
        </Col>
      </Row>

      {
        way === inputways.INTERACTIVE ?
        <Interactive
          position={position}
          direction={direction}
          isPlaced={isPlaced}
          onPlaceCoordsDispatch={(x, y, direction) => this.dispatchPlaceCoords(x, y, direction)}
          onRotationDispatch={(delta) => this.dispatchRotation(delta)}
          onMoveDispatch={() => this.dispatchMove()}
        /> :
        <Programmable
          position={position}
          direction={direction}
          isPlaced={isPlaced}
          onReset={() => onReset()}
          onPlaceCoordsDispatch={(x, y, direction) => this.dispatchPlaceCoords(x, y, direction)}
          onRotationDispatch={(delta) => this.dispatchRotation(delta)}
          onMoveDispatch={() => this.dispatchMove()}
        />
      }
    </Panel>;
  }
}

export default ControlPanel;
