import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, ButtonGroup } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

import { directions } from 'components/App/constants';

import './ControlPanel.css';

class Interactive extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    direction: PropTypes.oneOf([
      directions.NORTH,
      directions.SOUTH,
      directions.EAST,
      directions.WEST
    ]).isRequired,
    isPlaced: PropTypes.bool.isRequired,
    onPlaceCoordsDispatch: PropTypes.func.isRequired,
    onRotationDispatch: PropTypes.func.isRequired,
    onMoveDispatch: PropTypes.func.isRequired
  }

  reportPosition () {
    const { position, direction } = this.props;

    NotificationManager.info(`${position.x},${position.y},${direction}`, 'Current position');
  }

  handlePlace () {
    const { onPlaceCoordsDispatch } = this.props;

    const xCoord = this.refs.x.getValue();
    const yCoord = this.refs.y.getValue();
    const dir = this.refs.dir.getValue().trim();

    onPlaceCoordsDispatch(xCoord, yCoord, dir);
  }

  handleRotation (event, delta) {
    const { onRotationDispatch } = this.props;

    event.preventDefault();
    onRotationDispatch(delta);
  }

  renderPlace () {
    return <Row>
      <Col xs={3}>
        <Input ref="x" type="number" bsSize="large" min="0" max="4" defaultValue="0" placeholder="X" />
      </Col>
      <Col xs={3}>
        <Input ref="y" type="number" bsSize="large" min="0" max="4" defaultValue="0" placeholder="Y" />
      </Col>
      <Col xs={3}>
        <Input ref="dir" type="select" bsSize="large" placeholder="Facing" defaultValue="SOUTH">
          <option value={directions.NORTH}>{directions.NORTH}</option>
          <option value={directions.SOUTH}>{directions.SOUTH}</option>
          <option value={directions.EAST}>{directions.EAST}</option>
          <option value={directions.WEST}>{directions.WEST}</option>
        </Input>
      </Col>
      <Col xs={3}>
        <Button onClick={() => this.handlePlace()} bsStyle="success" bsSize="large" block>Place</Button>
      </Col>
    </Row>;
  }

  renderControls () {
    const { isPlaced, onMoveDispatch } = this.props;

    return isPlaced ? <Row className="form-group">
      <Col xs={9}>
        <ButtonGroup justified>
          <Button
            href="#"
            bsSize="large"
            onClick={(event) => this.handleRotation(event, -1)}
          >Left </Button>
          <Button
            href="#"
            bsSize="large"
            onClick={(event) => this.handleRotation(event, 1)}
          >Right</Button>
        </ButtonGroup>
      </Col>
      <Col xs={3}>
        <Button
          bsSize="large"
          bsStyle="primary"
          onClick={() => onMoveDispatch()} block
        >Move</Button>
      </Col>
    </Row> : null;
  }

  renderReport () {
    const { isPlaced } = this.props;

    return isPlaced ? <Row>
      <Col xs={12}>
        <Button
          bsSize="large"
          bsStyle="info"
          onClick={() => this.reportPosition()}
          block
        >Report</Button>
      </Col>
    </Row> : null;
  }

  render () {
    return <form>
      { this.renderPlace() }
      { this.renderControls() }
      { this.renderReport() }
    </form>;
  }
}

export default Interactive;
