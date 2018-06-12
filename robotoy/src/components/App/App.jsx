import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NotificationContainer } from 'react-notifications';

import Header from 'components/Header/Header.jsx';
import TableTop from 'components/TableTop/TableTop.jsx';
import ControlPanel from 'components/ControlPanel/ControlPanel.jsx';

import { directions } from 'components/App/constants';

class App extends Component {
  constructor () {
    super();

    this.state = {
      position: {
        x: 0,
        y: 0
      },
      direction: directions.SOUTH,
      isPlaced: false
    };
  }

  handleReset () {
    this.setState({
      position: {
        x: 0,
        y: 0
      },
      direction: directions.SOUTH,
      isPlaced: false
    });
  }

  handlePlace (x, y, direction) {
    this.setState({
      position: {
        x,
        y
      },
      direction,
      isPlaced: true
    });
  }

  handleRotate (direction) {
    this.setState({
      direction
    });
  }

  handleMove (position) {
    this.setState({
      position
    });
  }

  render () {
    const { position, direction, isPlaced } = this.state;

    return <Container>
      <Row>
        <Col xs={12}>
          <Header />
        </Col>
      </Row>

      <Row>
        <Col md={1} />
        <Col md={5}>
          <TableTop
            position={position}
            direction={direction}
            isPlaced={isPlaced}
          />
        </Col>
        <Col md={5}>
          <ControlPanel
            position={position}
            direction={direction}
            isPlaced={isPlaced}
            onPlace={(x, y, direction) => this.handlePlace(x, y, direction)}
            onRotate={(direction) => this.handleRotate(direction)}
            onMove={(position) => this.handleMove(position)}
            onReset={() => this.handleReset()}
          />
        </Col>
        <Col md={1} />
      </Row>

      <NotificationContainer />
    </Container>;
  }
}

export default App;
